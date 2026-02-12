export default function LastRuns({ lastRuns }) {
  if (!lastRuns.length) return null;

  return (
    <div>
      <h3>Last 5 Runs:</h3>
      {lastRuns.map((run, idx) => (
        <pre key={idx}>{JSON.stringify(run, null, 2)}</pre>
      ))}
    </div>
  );
}
