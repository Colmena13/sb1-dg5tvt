import type { Task, TaskPriority } from '../types/task';

export const calculateTaskUrgency = (task: Task): number => {
  const priorityWeights: Record<TaskPriority, number> = {
    low: 1,
    medium: 2,
    high: 3,
    urgent: 4,
  };

  let urgency = priorityWeights[task.priority];

  if (task.dueDate) {
    const timeUntilDue = task.dueDate - Date.now();
    const daysUntilDue = timeUntilDue / (1000 * 60 * 60 * 24);
    
    if (daysUntilDue < 0) {
      urgency *= 2; // Tareas vencidas son más urgentes
    } else if (daysUntilDue < 1) {
      urgency *= 1.5; // Tareas que vencen hoy
    } else if (daysUntilDue < 3) {
      urgency *= 1.2; // Tareas que vencen pronto
    }
  }

  return urgency;
};

export const sortTasksByUrgency = (tasks: Task[]): Task[] => {
  return [...tasks].sort(
    (a, b) => calculateTaskUrgency(b) - calculateTaskUrgency(a)
  );
};

export const getTaskProgress = (task: Task): number => {
  if (!task.subtasks.length) {
    return task.status === 'completed' ? 100 : 0;
  }

  const completedSubtasks = task.subtasks.filter(
    (subtask) => subtask.status === 'completed'
  ).length;

  return (completedSubtasks / task.subtasks.length) * 100;
};