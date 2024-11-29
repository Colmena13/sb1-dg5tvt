import { create } from 'zustand';
import type { Task, TaskStatus, TaskPriority } from '../types/task';

interface TaskStore {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  removeTask: (id: string) => void;
  updateTaskStatus: (id: string, status: TaskStatus) => void;
  updateTaskPriority: (id: string, priority: TaskPriority) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  
  addTask: (task) => {
    const now = Date.now();
    const newTask: Task = {
      id: now.toString(),
      createdAt: now,
      updatedAt: now,
      status: 'pending',
      priority: 'medium',
      tags: [],
      subtasks: [],
      ...task,
    };
    set((state) => ({ tasks: [...state.tasks, newTask] }));
  },

  updateTask: (id, updates) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id
          ? { ...task, ...updates, updatedAt: Date.now() }
          : task
      ),
    }));
  },

  removeTask: (id) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    }));
  },

  updateTaskStatus: (id, status) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id
          ? { ...task, status, updatedAt: Date.now() }
          : task
      ),
    }));
  },

  updateTaskPriority: (id, priority) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id
          ? { ...task, priority, updatedAt: Date.now() }
          : task
      ),
    }));
  },
}));