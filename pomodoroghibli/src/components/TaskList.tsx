'use client'
import { Task } from '@/types';
import { useState } from 'react'

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle.trim(),
      completed: false,
      pomodoros: {
        completed: 0,
        estimated: 0
      },
      createdAt: new Date()
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
    setIsAdding(false);
};

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed }
        : task
    ));
  };

  return (
    <div className="bg-cream rounded-lg p-4 shadow-lg">
      <h2 className="text-teal-700 text-xl mb-4">Tasks</h2>
      
      <div className="space-y-2">
        {tasks.map(task => (
          <div key={task.id} className="flex items-center gap-2 p-2 hover:bg-black/5 rounded">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
              className="w-4 h-4"
            />
            <span className={task.completed ? 'line-through text-gray-500' : ''}>
              {task.title}
            </span>
            <span className="ml-auto text-sm text-gray-500">
              {task.pomodoros.completed} 🍅
            </span>
          </div>
        ))}
      </div>

      {isAdding ? (
        <form onSubmit={addTask} className="mt-4">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="What are you working on?"
            className="w-full p-2 rounded border border-teal-700/20 focus:outline-none focus:border-teal-700"
            autoFocus
          />
          <div className="flex gap-2 mt-2">
            <button
              type="submit"
              className="px-4 py-2 bg-teal-700 text-white rounded"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 text-teal-700"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center text-teal-700 mt-4 hover:bg-black/5 p-2 rounded w-full"
        >
          <span className="text-2xl mr-2">+</span> Add Task
        </button>
      )}
    </div>
  );
}