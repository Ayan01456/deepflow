import { useState } from "react";
import "./StepSelector.css";

const stepsOptions = [
  "Clean Text",
  "Summarize",
  "Extract Keywords",
  "Tag Category",
  "Detect Entities",
  "Sentiment Analysis",
];

// Predefined templates
const templates = {
  quickSummary: ["Clean Text", "Summarize"],
  deepAnalysis: ["Clean Text", "Extract Keywords", "Tag Category"],
  fullProcessing: ["Clean Text", "Summarize", "Extract Keywords", "Sentiment Analysis"],
};

export default function StepSelector({ selectedSteps, setSelectedSteps }) {
  const handleToggleStep = (step) => {
    if (selectedSteps.includes(step)) {
      setSelectedSteps(selectedSteps.filter((s) => s !== step));
    } else if (selectedSteps.length < 4) {
      setSelectedSteps([...selectedSteps, step]);
    } else {
      alert("Maximum 4 steps allowed");
    }
  };

  const applyTemplate = (templateName) => {
    setSelectedSteps(templates[templateName]);
  };

  return (
    <div className="step-selector">
      <h3>Select Steps (2-4):</h3>
      
      {/* Template Buttons */}
      <div className="template-buttons">
        <button 
          className="template-btn"
          onClick={() => applyTemplate('quickSummary')}
          type="button"
        >
          ⚡ Quick Summary
        </button>
        <button 
          className="template-btn"
          onClick={() => applyTemplate('deepAnalysis')}
          type="button"
        >
          🔍 Deep Analysis
        </button>
        <button 
          className="template-btn"
          onClick={() => applyTemplate('fullProcessing')}
          type="button"
        >
          🚀 Full Processing
        </button>
      </div>

      <div className="template-divider">
        <span>or choose your own</span>
      </div>

      {/* Step Checkboxes */}
      <div className="step-checkboxes">
        {stepsOptions.map((step) => (
          <label key={step}>
            <input
              type="checkbox"
              checked={selectedSteps.includes(step)}
              onChange={() => handleToggleStep(step)}
            />
            {step}
          </label>
        ))}
      </div>
    </div>
  );
}
