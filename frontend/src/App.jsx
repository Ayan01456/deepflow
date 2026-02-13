import { useState } from "react";
import StepSelector from "./components/StepSelector";
import WorkflowOutput from "./components/WorkflowOutput";
import LastRuns from "./components/LastRuns";
import axios from "axios";

function App() {
  const [inputText, setInputText] = useState("");
  const [selectedSteps, setSelectedSteps] = useState([]);
  const [output, setOutput] = useState(null);
  const [lastRuns, setLastRuns] = useState([]);
  const [error, setError] = useState(null); // Added for validation messages
  const [loading, setLoading] = useState(false); // Added for UX

  const handleRunWorkflow = async () => {
    // 1. Client-side guard
    if (!inputText || selectedSteps.length < 2) {
      setError("Please enter text and select at least two steps.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await axios.post("http://localhost:5000/run-workflow", {
        inputText,
        steps: selectedSteps,
      });

      // 2. Check the "isAnalyzable" flag from your new Backend logic
      if (res.data.isAnalyzable === false) {
        setError(res.data.message);
        setOutput(null); // Clear any old output
      } else {
        setOutput(res.data.results);
        setLastRuns(res.data.lastRuns);
        setError(null);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong on our end. Please try again in a moment.");
    } finally {
      setLoading(false);
    }
  };

  // 3. The "Clear/Reset" Button Logic
  const resetWorkflow = () => {
    setInputText("");
    setSelectedSteps([]);
    setOutput(null);
    setError(null);
  };

  return (
    <div className="App">
      <h1>DeepFlow – Workflow Builder</h1>

      {/* Error Display */}
      {error && <div style={{ color: "red", marginBottom: "10px", fontWeight: "bold" }}>{error}</div>}

      <textarea
        placeholder="Paste your text here (Max 1000 words)..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        rows={6}
        cols={80}
      />

      <div className="word-count" style={{ fontSize: "12px", color: "#666" }}>
        Words: {inputText.trim() === "" ? 0 : inputText.trim().split(/\s+/).length} / 1000
      </div>

      <StepSelector selectedSteps={selectedSteps} setSelectedSteps={setSelectedSteps} />

      <div className="actions" style={{ marginTop: "20px" }}>
        <button onClick={handleRunWorkflow} disabled={loading}>
          {loading ? "Analyzing..." : "Run Workflow"}
        </button>
        
        <button onClick={resetWorkflow} style={{ marginLeft: "10px", backgroundColor: "#ccc" }}>
          Clear All
        </button>
      </div>

      <WorkflowOutput output={output} />

      <LastRuns lastRuns={lastRuns} />
    </div>
  );
}

export default App;