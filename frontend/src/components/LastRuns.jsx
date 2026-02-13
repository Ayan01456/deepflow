import React from 'react';

function LastRuns({ lastRuns }) {
  // Guard clause: don't render if there's no history
  if (!lastRuns || lastRuns.length === 0) return null;

  return (
    <div className="activity-container" style={{ marginTop: '30px' }}>
      <h2>Recent Activity</h2>

      {lastRuns.map((run, index) => (
        <div key={index} className="run-card" style={{
          border: '1px solid #ccc',
          padding: '15px',
          marginBottom: '15px',
          borderRadius: '8px'
        }}>
          {/* 1. Meta Data: Show Run Number and Time */}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#666' }}>
            <strong>Run #{lastRuns.length - index}</strong>
            <span>{new Date(run.date).toLocaleTimeString()}</span>
          </div>

          {/* 2. Original Input Section */}
          <div className="run-input-section">
            <small className="run-input-label">ORIGINAL TEXT:</small>
            <p className="run-input-text">
              {run.inputText}
            </p>
          </div>

          {/* 3. Results Section: The nested loop */}
          <div className="run-outputs">
            {run.results && run.results.map((res, i) => (
              <div key={i} style={{ marginTop: '10px' }}>
                <span className="run-output-step">{res.step.replace(/_/g, " ")}</span>
                <span className="run-output-text">{res.output}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default LastRuns;