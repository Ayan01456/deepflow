export default function WorkflowOutput({ output }) {
  // 'output' is now the array of results we sent from the backend
  if (!output || !Array.isArray(output)) return null; 

  return (
    <div className="mt-8 p-6 bg-white rounded-[32px] border border-slate-100 shadow-sm">
      <h2 className="text-xl font-bold mb-4 text-slate-800">Workflow Results</h2>
      <div className="space-y-4">
        {output.map((item, index) => (
          <div key={index} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">
              {item.step.replace("_", " ")}
            </p>
            <p className="text-slate-700 leading-relaxed">
              {item.output} 
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}