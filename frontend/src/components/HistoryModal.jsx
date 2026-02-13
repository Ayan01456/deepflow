import { useState } from 'react';
import './HistoryModal.css';

export default function HistoryModal({ isOpen, onClose, lastRuns, onSelectRun }) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="history-modal-backdrop" onClick={onClose}></div>

      {/* Modal */}
      <div className="history-modal">
        <div className="history-modal-header">
          <h2>Recent Activity</h2>
          <button className="history-modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="history-modal-body">
          {lastRuns && lastRuns.length > 0 ? (
            <div className="history-cards-container">
              {lastRuns.map((run, index) => (
                <div
                  key={index}
                  className="history-card"
                  onClick={() => {
                    onSelectRun(run);
                    onClose();
                  }}
                >
                  {/* Time Badge */}
                  <div className="history-card-time">
                    {new Date(run.date).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>

                  {/* Text Snippet */}
                  <div className="history-card-content">
                    <p className="history-card-text">
                      {run.inputText.length > 100
                        ? run.inputText.substring(0, 100) + '...'
                        : run.inputText}
                    </p>
                  </div>

                  {/* Steps Count */}
                  <div className="history-card-footer">
                    <span className="history-card-steps">
                      {run.results?.length || 0} steps processed
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="history-empty">
              <p>No history yet. Run a workflow to see it here!</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
