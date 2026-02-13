import { useState } from "react";
import StepSelector from "./components/StepSelector";
import WorkflowOutput from "./components/WorkflowOutput";
import LastRuns from "./components/LastRuns";
import StatusModal from "./components/StatusModal";
import HistoryModal from "./components/HistoryModal";
import axios from "axios";
import "./App.css";

function App() {
  const [inputText, setInputText] = useState("");
  const [selectedSteps, setSelectedSteps] = useState([]);
  const [output, setOutput] = useState(null);
  const [lastRuns, setLastRuns] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [viewingHistoricalRun, setViewingHistoricalRun] = useState(null);

  const handleRunWorkflow = async () => {
    if (!inputText || selectedSteps.length < 2) {
      setError("Please enter text and select at least two steps.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/run-workflow`, {
        inputText,
        steps: selectedSteps,
      });

      if (res.data.isAnalyzable === false) {
        setError(res.data.message);
        setOutput(null);
      } else {
        setOutput(res.data.results);
        setLastRuns(res.data.lastRuns);
        setError(null);
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
        "Something went wrong on our end. Please try again in a moment."
      );
    } finally {
      setLoading(false);
    }
  };

  const resetWorkflow = () => {
    setInputText("");
    setSelectedSteps([]);
    setOutput(null);
    setError(null);
  };

  const handleSelectHistoricalRun = (run) => {
    setViewingHistoricalRun(run);
  };

  const handleCloseHistoricalView = () => {
    setViewingHistoricalRun(null);
  };

  const displayOutput = viewingHistoricalRun ? viewingHistoricalRun.results : output;
  const displayInputText = viewingHistoricalRun ? viewingHistoricalRun.inputText : null;
  return (
    <>
      {/* Heart Icon for Status */}
      <div
        className="status-heart-icon"
        onClick={() => setIsStatusModalOpen(true)}
        title="Check System Status"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
        </svg>
      </div>

      {/* Status Modal */}
      <StatusModal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
      />
      {/* History Icon */}
      <div
        className="history-icon"
        onClick={() => setIsHistoryModalOpen(true)}
        title="View History"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
        </svg>
      </div>

      {/* History Modal */}
      <HistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        lastRuns={lastRuns}
        onSelectRun={handleSelectHistoricalRun}
      />
      <div className="App">
        <h1>DeepFlow – Workflow Builder</h1>

        {/* Error Display */}
        {error && <div className="error-message">{error}</div>}

        <textarea
          placeholder="Paste your text here (Max 300 words)..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          rows={6}
        />

        <div className="word-count">
          Words: {inputText.trim() === "" ? 0 : inputText.trim().split(/\s+/).length} / 300
        </div>

        <StepSelector selectedSteps={selectedSteps} setSelectedSteps={setSelectedSteps} />

        <div className="actions">
          <button className="btn-primary" onClick={handleRunWorkflow} disabled={loading}>
            {loading ? "Analyzing..." : "Run Workflow"}
          </button>

          <button className="btn-secondary" onClick={resetWorkflow}>
            Clear All
          </button>
        </div>

        {displayOutput && (
          <div className="workflow-output-wrapper">
            {viewingHistoricalRun && (
              <>
                <div className="historical-view-banner">
                  <span>📜 Viewing Historical Run</span>
                  <button
                    className="close-historical-btn"
                    onClick={handleCloseHistoricalView}
                  >
                    ✕ Back to Current
                  </button>
                </div>
                {displayInputText && (
                  <div className="historical-input-display">
                    <small className="historical-input-label">ORIGINAL INPUT:</small>
                    <p className="historical-input-text">{displayInputText}</p>
                  </div>
                )}
              </>
            )}
           <WorkflowOutput output={displayOutput} isHistorical={!!viewingHistoricalRun} />
          </div>
        )}

        {/* {!viewingHistoricalRun && <LastRuns lastRuns={lastRuns} />} */}
      </div>
    </>
  );
}

export default App;
