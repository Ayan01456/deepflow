export default function WorkflowOutput({ output }) {
  if (!output || !Array.isArray(output)) return null;

  return (
    <div className="workflow-output">
      <h2>Workflow Results</h2>
      <div>
        {output.map((item, index) => (
          <div key={index} className="output-item">
            <p className="output-step-label">
              {item.step.replace(/_/g, " ")}
            </p>
            <p className="output-content">
              {item.output}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
