import type { AgentAction, AgentResponse } from '../types';

export async function processQuery(action: AgentAction): Promise<AgentResponse> {
  try {
    // Simular procesamiento de consulta
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      id: Date.now().toString(),
      actionId: action.id,
      content: `He recibido tu consulta: "${action.content}". ¿En qué más puedo ayudarte?`,
      status: 'success',
      timestamp: Date.now(),
    };
  } catch (error) {
    return {
      id: Date.now().toString(),
      actionId: action.id,
      content: 'Lo siento, hubo un error al procesar tu consulta.',
      status: 'error',
      timestamp: Date.now(),
    };
  }
}