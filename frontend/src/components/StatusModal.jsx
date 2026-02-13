import { useState, useEffect } from 'react';
import './StatusModal.css';

export default function StatusModal({ isOpen, onClose }) {
  const [status, setStatus] = useState({
    backend: 'checking',
    database: 'checking',
    llm: 'checking'
  });

  useEffect(() => {
    if (isOpen) {
      checkStatus();
    }
  }, [isOpen]);

  const checkStatus = async () => {
    try {
      const response = await fetch('http://localhost:5000/status');
      const data = await response.json();
      
      setStatus({
        backend: data.backend === 'ok' ? 'connected' : 'disconnected',
        database: data.database === 'not connected yet' ? 'disconnected' : 'connected',
        llm: data.llm === 'Connected' ? 'connected' : 'disconnected'
      });
    } catch (error) {
      console.error('Failed to fetch status:', error);
      setStatus({
        backend: 'disconnected',
        database: 'disconnected',
        llm: 'disconnected'
      });
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="status-modal-backdrop" onClick={onClose}></div>
      
      {/* Modal */}
      <div className="status-modal">
        <div className="status-modal-header">
          <h2>System Status</h2>
          <button className="status-modal-close" onClick={onClose}>
            ✕
          </button>
        </div>
        
        <div className="status-modal-body">
          {/* Backend Status */}
          <div className="status-item">
            <div className="status-info">
              <span className="status-label">Backend</span>
              <span className={`status-text ${status.backend}`}>
                {status.backend === 'connected' ? 'Connected' : 
                 status.backend === 'checking' ? 'Checking...' : 'Disconnected'}
              </span>
            </div>
            <div className={`status-circle ${status.backend} ${status.backend === 'connected' ? 'breathing-circle' : ''}`}></div>
          </div>

          {/* Database Status */}
          <div className="status-item">
            <div className="status-info">
              <span className="status-label">Database</span>
              <span className={`status-text ${status.database}`}>
                {status.database === 'connected' ? 'Connected' : 
                 status.database === 'checking' ? 'Checking...' : 'Not Connected'}
              </span>
            </div>
            <div className={`status-circle ${status.database} ${status.database === 'connected' ? 'breathing-circle' : ''}`}></div>
          </div>

          {/* LLM Status */}
          <div className="status-item">
            <div className="status-info">
              <span className="status-label">LLM (AI Model)</span>
              <span className={`status-text ${status.llm}`}>
                {status.llm === 'connected' ? 'Connected' : 
                 status.llm === 'checking' ? 'Checking...' : 'Not Connected'}
              </span>
            </div>
            <div className={`status-circle ${status.llm} ${status.llm === 'connected' ? 'breathing-circle' : ''}`}></div>
          </div>
        </div>

        <button className="refresh-status-btn" onClick={checkStatus}>
          Refresh Status
        </button>
      </div>
    </>
  );
}
