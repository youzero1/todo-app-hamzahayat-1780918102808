import { useState } from 'react';
import { Plus } from 'lucide-react';
import clsx from 'clsx';
import { Priority } from '../types';

type TodoInputProps = {
  onAdd: (text: string, priority: Priority) => void;
};

const PRIORITY_OPTIONS: { value: Priority; label: string; color: string }[] = [
  { value: 'low', label: 'Low', color: 'bg-emerald-100 text-emerald-700 border-emerald-300' },
  { value: 'medium', label: 'Medium', color: 'bg-amber-100 text-amber-700 border-amber-300' },
  { value: 'high', label: 'High', color: 'bg-rose-100 text-rose-700 border-rose-300' },
];

export default function TodoInput({ onAdd }: TodoInputProps) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text, priority);
    setText('');
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 border-b border-slate-100">
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 text-sm font-medium"
        >
          <Plus size={16} />
          Add
        </button>
      </div>
      <div className="flex gap-2">
        {PRIORITY_OPTIONS.map(opt => (
          <button
            key={opt.value}
            type="button"
            onClick={() => setPriority(opt.value)}
            className={clsx(
              'px-3 py-1 rounded-full text-xs font-medium border transition',
              opt.color,
              priority === opt.value ? 'ring-2 ring-offset-1 ring-indigo-400 font-bold' : 'opacity-60 hover:opacity-100'
            )}
          >
            {opt.label}
          </button>
        ))}
        <span className="text-xs text-slate-400 self-center ml-1">priority</span>
      </div>
    </form>
  );
}
