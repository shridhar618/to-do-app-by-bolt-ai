import React, { useState } from 'react';
import { Trash2, Edit2, Check, X } from 'lucide-react';

interface TodoItemProps {
  todo: {
    id: string;
    text: string;
    completed: boolean;
  };
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

export function TodoItem({ todo, onDelete, onToggle, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSubmit = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText);
      setIsEditing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditText(todo.text);
    }
  };

  return (
    <div className={`group flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm transition-all duration-200 ${todo.completed ? 'opacity-75' : ''}`}>
      <button
        onClick={() => onToggle(todo.id)}
        className={`flex-shrink-0 w-5 h-5 rounded-full border-2 transition-colors duration-200 ${
          todo.completed ? 'bg-green-500 border-green-500' : 'border-gray-300 hover:border-green-500'
        }`}
      >
        {todo.completed && <Check className="w-4 h-4 text-white" />}
      </button>

      {isEditing ? (
        <div className="flex-grow flex gap-2">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-grow px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          <button
            onClick={handleSubmit}
            className="p-1 text-green-600 hover:text-green-700"
          >
            <Check className="w-5 h-5" />
          </button>
          <button
            onClick={() => {
              setIsEditing(false);
              setEditText(todo.text);
            }}
            className="p-1 text-red-600 hover:text-red-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <>
          <span className={`flex-grow ${todo.completed ? 'line-through text-gray-500' : ''}`}>
            {todo.text}
          </span>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 text-blue-600 hover:text-blue-700"
            >
              <Edit2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="p-1 text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}