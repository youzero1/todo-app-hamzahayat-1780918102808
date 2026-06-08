import { useState } from 'react';
import { Trash2, Pencil, Check, X } from 'lucide-react';
import clsx from 'clsx';
import { Todo } from '@/types';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
};

const PRIORITY_DOT: Record<string, string> = {
  low: 'bg-emerald-400',
  medium: 'bg-amber-400',
  high: 'bg-rose-400',
};

const PRIORITY_BADGE: Record<string, string> = {
  low: 'bg-emerald-50 text-emerald-600',
  medium: 'bg-amber-50 text-amber-600',
  high: 'bg-rose-50 text-rose-600',
};

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  function handleEditSave() {
    if (editText.trim()) {
      onEdit(todo.id, editText);
    }
    setEditing(false);
  }

  function handleEditCancel() {
    setEditText(todo.text);
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleEditSave();
    if (e.key === 'Escape') handleEditCancel();
  }

  return (
    <li className={clsx(
      'flex items-center gap-3 px-4 py-3 group hover:bg-slate-50 transition',
      todo.completed && 'opacity-60'
    )}>
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={clsx(
          'w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition',
          todo.completed
            ? 'bg-indigo-500 border-indigo-500 text-white'
            : 'border-slate-300 hover:border-indigo-400'
        )}
        aria-label="Toggle complete"
      >
        {todo.completed && <Check size={11} strokeWidth={3} />}
      </button>

      {/* Priority dot */}
      <span className={clsx('w-2 h-2 rounded-full flex-shrink-0', PRIORITY_DOT[todo.priority])} />

      {/* Text / Edit */}
      {editing ? (
        <input
          autoFocus
          value={editText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 px-2 py-0.5 text-sm border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
      ) : (
        <span className={clsx(
          'flex-1 text-sm text-slate-700',
          todo.completed && 'line-through text-slate-400'
        )}>
          {todo.text}
        </span>
      )}

      {/* Priority badge */}
      {!editing && (
        <span className={clsx(
          'text-xs px-2 py-0.5 rounded-full font-medium hidden sm:inline-block',
          PRIORITY_BADGE[todo.priority]
        )}>
          {todo.priority}
        </span>
      )}

      {/* Actions */}
      <div className="flex items-center gap-1 flex-shrink-0">
        {editing ? (
          <>
            <button
              onClick={handleEditSave}
              className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition"
              aria-label="Save"
            >
              <Check size={15} />
            </button>
            <button
              onClick={handleEditCancel}
              className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 transition"
              aria-label="Cancel"
            >
              <X size={15} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => { setEditing(true); setEditText(todo.text); }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 opacity-0 group-hover:opacity-100 transition"
              aria-label="Edit"
            >
              <Pencil size={15} />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 opacity-0 group-hover:opacity-100 transition"
              aria-label="Delete"
            >
              <Trash2 size={15} />
            </button>
          </>
        )}
      </div>
    </li>
  );
}
