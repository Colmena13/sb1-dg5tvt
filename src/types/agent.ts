export interface AgentCapability {
  id: string;
  name: string;
  description: string;
  isEnabled: boolean;
  parameters?: Record<string, unknown>;
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

export interface AgentState {
  isProcessing: boolean;
  currentTask: string | null;
  error: string | null;
}

export interface AgentContext {
  lastInteraction: number;
  conversationHistory: string[];
  userPreferences: Record<string, unknown>;
  environmentState: Record<string, unknown>;
}