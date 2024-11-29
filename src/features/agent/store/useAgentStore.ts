import { create } from 'zustand';
import type { AgentAction, AgentResponse, AgentState, AgentConfig } from '../types';
import { defaultCapabilities } from '../capabilities';

interface AgentStore extends AgentState {
  config: AgentConfig;
  actions: AgentAction[];
  responses: AgentResponse[];
  addAction: (action: AgentAction) => Promise<AgentResponse>;
  updateActionStatus: (id: string, updates: Partial<AgentResponse>) => void;
  getActionById: (id: string) => AgentAction | undefined;
  getActionsByType: (type: AgentAction['type']) => AgentAction[];
  updateConfig: (config: Partial<AgentConfig>) => void;
}

export const useAgentStore = create<AgentStore>((set, get) => ({
  isProcessing: false,
  currentAction: null,
  lastResponse: null,
  error: null,
  config: {
    name: 'Colmena AI',
    description: 'Asistente inteligente personal',
    capabilities: defaultCapabilities,
    preferences: {},
  },
  actions: [],
  responses: [],

  addAction: async (action) => {
    set((state) => ({ 
      actions: [...state.actions, action],
      isProcessing: true,
      currentAction: action,
      error: null
    }));

    try {
      const capability = get().config.capabilities.find(
        (cap) => cap.isEnabled && cap.handler
      );

      if (!capability) {
        throw new Error('No hay capacidades disponibles para procesar la acción');
      }

      const response = await capability.handler(action);

      set((state) => ({
        responses: [...state.responses, response],
        lastResponse: response,
        isProcessing: false,
        currentAction: null
      }));

      return response;
    } catch (error) {
      const errorResponse: AgentResponse = {
        id: Date.now().toString(),
        actionId: action.id,
        content: error instanceof Error ? error.message : 'Error desconocido',
        status: 'error',
        timestamp: Date.now(),
      };

      set((state) => ({
        responses: [...state.responses, errorResponse],
        lastResponse: errorResponse,
        error: errorResponse.content,
        isProcessing: false,
        currentAction: null
      }));

      return errorResponse;
    }
  },

  updateActionStatus: (id, updates) => {
    set((state) => ({
      responses: state.responses.map((response) =>
        response.actionId === id ? { ...response, ...updates } : response
      )
    }));
  },

  getActionById: (id) => {
    return get().actions.find((action) => action.id === id);
  },

  getActionsByType: (type) => {
    return get().actions.filter((action) => action.type === type);
  },

  updateConfig: (newConfig) => 
    set((state) => ({ 
      config: { ...state.config, ...newConfig } 
    })),
}));