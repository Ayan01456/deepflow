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

  const handleRunWorkflow = async () => {
    if (!inputText || selectedSteps.length < 2) {
      alert("Please enter text and select 2-4 steps");
      return;
    }

    try {
      // Call backend (for now, dummy response)
      const res = await axios.post("http://localhost:5000/run-workflow", {
        inputText,
        steps: selectedSteps,
      });
      setOutput(res.data);       // display backend response
      setLastRuns([res.data, ...lastRuns].slice(0, 5));
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="App">
      <h1>DeepFlow – Workflow Builder</h1>

      <textarea
        placeholder="Paste your text here..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        rows={6}
        cols={80}
      />

      <StepSelector selectedSteps={selectedSteps} setSelectedSteps={setSelectedSteps} />

      <button onClick={handleRunWorkflow}>Run Workflow</button>

      <WorkflowOutput output={output} />

      <LastRuns lastRuns={lastRuns} />
    </div>
  );
}

export default App;
