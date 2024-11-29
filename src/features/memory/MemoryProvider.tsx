import React, { createContext, useContext } from 'react';
import { useMemoryStore } from '../../store/useMemoryStore';
import type { Memory, MemoryQuery } from '../../types/memory';

interface MemoryContextType {
  memories: Memory[];
  addMemory: (memory: Omit<Memory, 'id' | 'createdAt' | 'lastAccessed'>) => void;
  queryMemories: (query: MemoryQuery) => Memory[];
}

const MemoryContext = createContext<MemoryContextType | null>(null);

export function MemoryProvider({ children }: { children: React.ReactNode }) {
  const memoryStore = useMemoryStore();

  const value = {
    memories: memoryStore.memories,
    addMemory: memoryStore.addMemory,
    queryMemories: memoryStore.queryMemories,
  };

  return (
    <MemoryContext.Provider value={value}>
      {children}
    </MemoryContext.Provider>
  );
}

export function useMemory() {
  const context = useContext(MemoryContext);
  if (!context) {
    throw new Error('useMemory debe usarse dentro de un MemoryProvider');
  }
  return context;
}