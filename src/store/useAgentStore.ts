import { create } from 'zustand';
import type { AgentState, AgentConfig } from '../types/agent';

interface AgentStore extends AgentState {
  config: AgentConfig;
  setProcessing: (isProcessing: boolean) => void;
  setCurrentTask: (task: string | null) => void;
  setError: (error: string | null) => void;
  updateConfig: (config: Partial<AgentConfig>) => void;
}

export const useAgentStore = create<AgentStore>((set) => ({
  isProcessing: false,
  currentTask: null,
  error: null,
  config: {
    name: 'Colmena AI',
    description: 'Tu asistente inteligente personal',
    capabilities: [],
    preferences: {},
  },
  setProcessing: (isProcessing) => set({ isProcessing }),
  setCurrentTask: (currentTask) => set({ currentTask }),
  setError: (error) => set({ error }),
  updateConfig: (newConfig) => 
    set((state) => ({ 
      config: { ...state.config, ...newConfig } 
    })),
}));