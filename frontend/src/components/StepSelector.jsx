import { useState } from "react";

const stepsOptions = [
  "Clean Text",
  "Summarize",
  "Extract Keywords",
  "Tag Category",
  "Detect Entities",
  "Sentiment Analysis",
];

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

  return (
    <div>
      <h3>Select Steps (2-4):</h3>
      {stepsOptions.map((step) => (
        <label key={step} style={{ display: "block", margin: "5px 0" }}>
          <input
            type="checkbox"
            checked={selectedSteps.includes(step)}
            onChange={() => handleToggleStep(step)}
          />
          {step}
        </label>
      ))}
    </div>
  );
}
