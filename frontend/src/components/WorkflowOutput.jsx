import { useTypewriter } from '../hooks/useTypewriter';

export default function WorkflowOutput({ output, isHistorical = false }) {
  if (!output || !Array.isArray(output)) return null;

  return (
    <div className="workflow-output">
      <h2>Workflow Results</h2>
      <div>
        {output.map((item, index) => (
          <OutputItem 
            key={index} 
            item={item} 
            isHistorical={isHistorical}
          />
        ))}
      </div>
    </div>
  );
}

function OutputItem({ item, isHistorical }) {
  // Only apply typewriter effect if NOT historical
  const displayedText = useTypewriter(
    item.output, 
    25, // Speed: 25ms per character (like Claude's typing)
    !isHistorical // Enable only for current results
  );

  return (
    <div className="output-item">
      <p className="output-step-label">
        {item.step.replace(/_/g, " ")}
      </p>
      <p className="output-content">
        {displayedText}
        {/* Show blinking cursor while typing (only if not historical) */}
        {!isHistorical && displayedText.length < item.output.length && (
          <span className="typing-cursor">▊</span>
        )}
      </p>
    </div>
  );
}
