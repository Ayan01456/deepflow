import express from "express";
import axios from "axios";
const router = express.Router();

let lastRunsStore = [];

router.post("/", async (req, res) => {
  const { inputText, steps } = req.body;

  // 1. Safety Guard
  if (!inputText || inputText.split(/\s+/).length > 300) {
    return res.status(400).json({ isAnalyzable: false, message: "Text must be between 1 and 1000 words." });
  }

  try {
    // 2. The AI Prompt (Instructing JSON output)
    const systemPrompt = `
      You are a text analysis engine. Analyze the text for: ${steps.join(", ")}.
      Return ONLY a JSON object. 
      If the text is gibberish or non-sensical, return: {"isAnalyzable": false, "message": "This text is not analyzable. Please provide valid text."}
      If valid, return: {"isAnalyzable": true, "results": [{"step": "Step Name", "output": "Analysis text"}]}
    `;

    // 3. OpenRouter / DeepSeek Call
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-r1",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: inputText }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "DeepFlow App"
        }
      }
    );

    // --- ADDED CLEANING LOGIC HERE ---
    const rawContent = response.data.choices[0].message.content;

    // This regex removes ```json and ``` blocks if the AI includes them
    const cleanJsonString = rawContent
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const aiData = JSON.parse(cleanJsonString);
    // ---------------------------------

    // 4. Handle History & Response
    if (aiData.isAnalyzable) {
      const newRun = {
        results: aiData.results,
        inputText: inputText, // Full text for the "Smart" history view
        date: new Date()
      };
      lastRunsStore.unshift(newRun);
      if (lastRunsStore.length > 5) lastRunsStore.pop();
      res.json({ ...aiData, lastRuns: lastRunsStore });
    } else {
      // If NOT analyzable, we do NOT touch the lastRunsStore
      // We just send the error message to the frontend
      res.json({
        isAnalyzable: false,
        message: aiData.message,
        lastRuns: lastRunsStore // Still send the existing history so the UI doesn't break
      });
    }

  } catch (error) {
    if (error.response) {
      console.error("--- AI API ERROR ---");
      console.error("Status Code:", error.response.status);
      console.error("Error Data:", JSON.stringify(error.response.data, null, 2));
      console.error("---------------------");
    } else {
      console.error("Backend Error:", error.message);
      // If JSON.parse fails, log what the AI actually sent
      if (error.message.includes("Unexpected token")) {
        console.error("The AI sent a non-JSON response. Check the 'rawContent' variable.");
      }
    }

    res.status(500).json({ error: "AI service error. Check terminal for details." });
  }
});

export default router;