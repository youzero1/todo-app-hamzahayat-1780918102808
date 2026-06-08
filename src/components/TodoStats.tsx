type TodoStatsProps = {
  activeCount: number;
  completedCount: number;
};

export default function TodoStats({ activeCount, completedCount }: TodoStatsProps) {
  const total = activeCount + completedCount;
  const percent = total === 0 ? 0 : Math.round((completedCount / total) * 100);

  return (
    <div className="flex gap-3 mb-4">
      <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-100 p-4 text-center">
        <div className="text-2xl font-bold text-indigo-600">{total}</div>
        <div className="text-xs text-slate-500 mt-0.5">Total</div>
      </div>
      <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-100 p-4 text-center">
        <div className="text-2xl font-bold text-amber-500">{activeCount}</div>
        <div className="text-xs text-slate-500 mt-0.5">Remaining</div>
      </div>
      <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-100 p-4 text-center">
        <div className="text-2xl font-bold text-emerald-500">{completedCount}</div>
        <div className="text-xs text-slate-500 mt-0.5">Done</div>
      </div>
      <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-100 p-4 text-center">
        <div className="text-2xl font-bold text-purple-500">{percent}%</div>
        <div className="text-xs text-slate-500 mt-0.5">Complete</div>
      </div>
    </div>
  );
}
