export interface Memory {
  id: string;
  content: string;
  tags: string[];
  importance: number;
  createdAt: number;
  lastAccessed: number;
  context?: Record<string, unknown>;
}

export interface MemoryQuery {
  tags?: string[];
  importance?: number;
  timeRange?: {
    start: number;
    end: number;
  };
}