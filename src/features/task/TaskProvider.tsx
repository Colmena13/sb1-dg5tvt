import React, { createContext, useContext } from 'react';
import { useTaskStore } from '../../store/useTaskStore';
import type { Task, TaskStatus, TaskPriority } from '../../types/task';

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTaskStatus: (id: string, status: TaskStatus) => void;
  updateTaskPriority: (id: string, priority: TaskPriority) => void;
}

const TaskContext = createContext<TaskContextType | null>(null);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const taskStore = useTaskStore();

  const value = {
    tasks: taskStore.tasks,
    addTask: taskStore.addTask,
    updateTaskStatus: taskStore.updateTaskStatus,
    updateTaskPriority: taskStore.updateTaskPriority,
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTask() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask debe usarse dentro de un TaskProvider');
  }
  return context;
}