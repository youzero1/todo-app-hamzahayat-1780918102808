import clsx from 'clsx';
import { Filter } from '@/types';

type TodoFooterProps = {
  filter: Filter;
  setFilter: (f: Filter) => void;
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => void;
};

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

export default function TodoFooter({
  filter,
  setFilter,
  activeCount,
  completedCount,
  onClearCompleted,
}: TodoFooterProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-t border-slate-100 text-xs text-slate-500">
      <span>
        {activeCount} {activeCount === 1 ? 'item' : 'items'} left
      </span>

      <div className="flex gap-1">
        {FILTERS.map(f => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={clsx(
              'px-3 py-1 rounded-lg font-medium transition',
              filter === f.value
                ? 'bg-indigo-600 text-white'
                : 'text-slate-500 hover:text-indigo-600 hover:bg-indigo-50'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <button
        onClick={onClearCompleted}
        disabled={completedCount === 0}
        className="text-slate-400 hover:text-rose-500 disabled:opacity-30 disabled:cursor-not-allowed transition"
      >
        Clear done
      </button>
    </div>
  );
}
