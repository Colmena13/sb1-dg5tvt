export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: number;
}

export interface Task {
  id: string;
  title: string;
  status: 'pending' | 'completed';
  createdAt: number;
}

export interface Memory {
  id: string;
  content: string;
  tags: string[];
  createdAt: number;
}