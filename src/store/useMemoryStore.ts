import { create } from 'zustand';
import type { Memory, MemoryQuery } from '../types/memory';

interface MemoryStore {
  memories: Memory[];
  addMemory: (memory: Omit<Memory, 'id' | 'createdAt' | 'lastAccessed'>) => void;
  removeMemory: (id: string) => void;
  queryMemories: (query: MemoryQuery) => Memory[];
  updateMemory: (id: string, updates: Partial<Memory>) => void;
}

export const useMemoryStore = create<MemoryStore>((set, get) => ({
  memories: [],
  addMemory: (memory) => {
    const newMemory: Memory = {
      id: Date.now().toString(),
      createdAt: Date.now(),
      lastAccessed: Date.now(),
      importance: 1,
      ...memory,
    };
    set((state) => ({ 
      memories: [...state.memories, newMemory] 
    }));
  },
  removeMemory: (id) => {
    set((state) => ({
      memories: state.memories.filter((m) => m.id !== id)
    }));
  },
  queryMemories: (query) => {
    const { memories } = get();
    return memories.filter((memory) => {
      if (query.tags && !query.tags.some((tag) => memory.tags.includes(tag))) {
        return false;
      }
      if (query.importance && memory.importance < query.importance) {
        return false;
      }
      if (query.timeRange) {
        const { start, end } = query.timeRange;
        if (memory.createdAt < start || memory.createdAt > end) {
          return false;
        }
      }
      return true;
    });
  },
  updateMemory: (id, updates) => {
    set((state) => ({
      memories: state.memories.map((memory) =>
        memory.id === id ? { ...memory, ...updates } : memory
      ),
    }));
  },
}));