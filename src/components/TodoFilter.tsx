import React from 'react';

interface TodoFilterProps {
  filter: 'all' | 'active' | 'completed';
  onFilterChange: (filter: 'all' | 'active' | 'completed') => void;
}

export function TodoFilter({ filter, onFilterChange }: TodoFilterProps) {
  return (
    <div className="flex gap-2">
      {(['all', 'active', 'completed'] as const).map((f) => (
        <button
          key={f}
          onClick={() => onFilterChange(f)}
          className={`px-4 py-2 rounded-lg capitalize transition-colors duration-200 ${
            filter === f
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {f}
        </button>
      ))}
    </div>
  );
}