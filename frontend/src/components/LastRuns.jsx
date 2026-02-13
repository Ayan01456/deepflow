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
          <div style={{ margin: '10px 0', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
            <small style={{ fontWeight: 'bold', display: 'block', color: '#888' }}>ORIGINAL TEXT:</small>
            <p style={{ margin: '5px 0 0', fontSize: '14px', fontStyle: 'italic' }}>
              {run.inputText}
            </p>
          </div>

          {/* 3. Results Section: The nested loop */}
          <div className="run-outputs">
            {run.results && run.results.map((res, i) => (
              <div key={i} style={{ marginTop: '10px' }}>
                <span style={{ fontWeight: 'bold', color: '#007bff' }}>{res.step}: </span>
                <span style={{ fontSize: '14px' }}>{res.output}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default LastRuns;