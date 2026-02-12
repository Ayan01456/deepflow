export default function WorkflowOutput({ output }) {
  if (!output) return null;

  return (
    <div>
      <h3>Workflow Output:</h3>
      <pre>{JSON.stringify(output, null, 2)}</pre>
    </div>
  );
}
