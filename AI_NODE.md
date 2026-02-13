# AI Development Notes

## 🤖 LLM & Provider Information
* **Model:** DeepSeek R1
* **Reasoning for Model Choice:** * **Scalability & Access:** Unlike Gemini (which has strict daily limits, 20/day) or ChatGPT (paid tiers), DeepSeek R1 provided the most efficient path for unlimited development calls.
  * **Structured JSON:** The model was highly effective at returning data in a format that the frontend could immediately parse into Keyword and Summary components.

## 🛠️ How AI was utilized
* **Code Quality (ChatGPT & Gemini):** I utilized ChatGPT and Gemini to architect the project, focusing specifically on writing **readable, scalable, and clean code** for the backend and data-handling logic.
* **LLM Integration (DeepSeek):** DeepSeek R1 was used as the primary engine for the actual text analysis and summarization.
* **UI/UX Design (Claude):** I leveraged Claude’s design capabilities to create a high-end, user-friendly frontend that is both visually appealing and responsive.

## ✅ Manual Verification & Quality Control
* **Edge-Case Handling:** I manually identified and tested several edge cases, including:
  * Handling extremely long text inputs that might exceed token limits.
  * Managing empty or "junk" inputs (Bouncer Logic).
  * Gracefully handling API timeouts or "Server Busy" errors.
* **Response Cleaning:** I wrote a custom utility to strip "Thinking" blocks and Markdown tags from DeepSeek's raw output to ensure the JSON parser never fails.
* **Manual Testing:** I performed end-to-end testing of the entire workflow—from input submission to UI rendering—to ensure data integrity at every step.