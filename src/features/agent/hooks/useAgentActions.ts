import { useCallback } from 'react';
import { useAgentStore } from '../store/useAgentStore';
import type { AgentAction, AgentResponse } from '../types';

export function useAgentActions() {
  const { 
    addAction,
    updateActionStatus,
    getActionById,
    getActionsByType
  } = useAgentStore();

  const executeAction = useCallback(async (action: Omit<AgentAction, 'id' | 'timestamp'>) => {
    const newAction: AgentAction = {
      ...action,
      id: Date.now().toString(),
      timestamp: Date.now()
    };

    try {
      const response = await addAction(newAction);
      return response;
    } catch (error) {
      updateActionStatus(newAction.id, {
        status: 'error',
        error: error instanceof Error ? error.message : 'Error desconocido'
      });
      throw error;
    }
  }, [addAction, updateActionStatus]);

  const getActionHistory = useCallback((type?: AgentAction['type']) => {
    return type ? getActionsByType(type) : getActionById;
  }, [getActionById, getActionsByType]);

  return {
    executeAction,
    getActionHistory
  };
}