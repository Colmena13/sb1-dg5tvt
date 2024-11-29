import React, { createContext, useContext, useCallback } from 'react';
import { useAgentStore } from '@/store/useAgentStore';
import type { AgentCapability, AgentConfig } from '@/types/agent';

interface AgentContextType {
  isProcessing: boolean;
  currentTask: string | null;
  error: string | null;
  config: AgentConfig;
  capabilities: AgentCapability[];
  executeTask: (task: string) => Promise<void>;
  updateConfig: (config: Partial<AgentConfig>) => void;
}

const AgentContext = createContext<AgentContextType | null>(null);

export function AgentProvider({ children }: { children: React.ReactNode }) {
  const { 
    isProcessing, 
    currentTask, 
    error, 
    config,
    setProcessing,
    setCurrentTask,
    setError,
    updateConfig 
  } = useAgentStore();

  const executeTask = useCallback(async (task: string) => {
    try {
      setProcessing(true);
      setCurrentTask(task);
      
      // Aquí iría la lógica de ejecución de tareas
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProcessing(false);
      setCurrentTask(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      setProcessing(false);
    }
  }, [setProcessing, setCurrentTask, setError]);

  const value = {
    isProcessing,
    currentTask,
    error,
    config,
    capabilities: config.capabilities,
    executeTask,
    updateConfig
  };

  return (
    <AgentContext.Provider value={value}>
      {children}
    </AgentContext.Provider>
  );
}

export function useAgent() {
  const context = useContext(AgentContext);
  if (!context) {
    throw new Error('useAgent debe usarse dentro de un AgentProvider');
  }
  return context;
}