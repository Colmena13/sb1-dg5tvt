export interface AgentAction {
  id: string;
  type: 'query' | 'task' | 'system';
  content: string;
  metadata?: Record<string, unknown>;
  timestamp: number;
}

export interface AgentResponse {
  id: string;
  actionId: string;
  content: string;
  status: 'success' | 'error' | 'pending';
  metadata?: Record<string, unknown>;
  timestamp: number;
}

export interface AgentState {
  isProcessing: boolean;
  currentAction: AgentAction | null;
  lastResponse: AgentResponse | null;
  error: string | null;
}

export interface AgentCapability {
  id: string;
  name: string;
  description: string;
  isEnabled: boolean;
  handler: (action: AgentAction) => Promise<AgentResponse>;
  metadata?: Record<string, unknown>;
}

export interface AgentConfig {
  name: string;
  description: string;
  capabilities: AgentCapability[];
  preferences: Record<string, unknown>;
  model?: {
    name: string;
    version: string;
    parameters: Record<string, unknown>;
  };
}