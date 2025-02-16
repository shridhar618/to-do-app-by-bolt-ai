import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { TodoItem } from './components/TodoItem';
import { TodoInput } from './components/TodoInput';
import { TodoFilter } from './components/TodoFilter';
import { useTodos } from './hooks/useTodos';

function App() {
  const { todos, addTodo, deleteTodo, toggleTodo, editTodo } = useTodos();
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto p-6">
        <div className="flex items-center gap-3 mb-8">
          <CheckCircle className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Todo List</h1>
        </div>

        <TodoInput onAdd={addTodo} />

        <div className="mt-8 flex items-center justify-between">
          <TodoFilter filter={filter} onFilterChange={setFilter} />
          <p className="text-sm text-gray-600">
            {completedCount} of {todos.length} tasks completed
          </p>
        </div>

        <div className="mt-6 space-y-4">
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={deleteTodo}
              onToggle={toggleTodo}
              onEdit={editTodo}
            />
          ))}
          {filteredTodos.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              {filter === 'all'
                ? 'No tasks yet. Add one above!'
                : filter === 'active'
                ? 'No active tasks!'
                : 'No completed tasks!'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;