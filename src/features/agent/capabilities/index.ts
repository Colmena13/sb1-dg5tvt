import type { AgentCapability } from '../types';
import { processQuery } from './processQuery';

export const defaultCapabilities: AgentCapability[] = [
  {
    id: 'query-processor',
    name: 'Procesador de Consultas',
    description: 'Procesa y responde consultas del usuario',
    isEnabled: true,
    handler: processQuery,
  },
];