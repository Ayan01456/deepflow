## PROMPTS_USED.md

### Core System Prompt (The "Engine")



```text
This is the primary prompt used in the backend to instruct DeepSeek R1. It was designed to enforce strict JSON output and handle input validation.

  " You are a text analysis engine. Analyze the text for: ${steps.join(", ")}.
  Return ONLY a JSON object. 
  If the text is gibberish or non-sensical, return: {"isAnalyzable": false, "message": "This text is not analyzable. Please provide valid text."}
  If valid, return: {"isAnalyzable": true, "results": [{"step": "Step Name", "output": "Analysis text"}]} "

```
### Development & Architecture Prompts
#### I used a variety of prompts across different LLMs to build this project:

### 🧠 ChatGPT & Gemini (Logic & Scalability)
- "How can I structure a Node.js Express API to be scalable for multiple analysis steps?"

- "Write a clean, readable helper function to validate long-form text input before sending it to an API."

### 🎨 Claude (UI/UX Design)
- "Create a modern, dark-themed React dashboard using Tailwind CSS. Include a 'System Health' status bar and dynamic cards for analysis results."

- "Help me design a user-friendly 'Bouncer' UI that explains to the user why their text was rejected if it's too short or nonsensical."

- 🔌 DeepSeek (Integration)
"What is the correct API request format for DeepSeek R1 to ensure the fastest response time for summarization tasks?"