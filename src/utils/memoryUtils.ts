import type { Memory } from '../types/memory';

export const calculateMemoryRelevance = (
  memory: Memory,
  context: Record<string, unknown>
): number => {
  let relevance = memory.importance;

  // Factor de tiempo: memorias más recientes son más relevantes
  const ageInHours = (Date.now() - memory.createdAt) / (1000 * 60 * 60);
  const timeFactor = Math.exp(-ageInHours / 24); // Decae exponencialmente con el tiempo
  relevance *= timeFactor;

  // Factor de uso: memorias más accedidas son más relevantes
  const accessFactor = Math.log(
    (Date.now() - memory.lastAccessed) / (1000 * 60) + 1
  );
  relevance *= accessFactor;

  return relevance;
};

export const findRelatedMemories = (
  memories: Memory[],
  context: Record<string, unknown>,
  limit = 5
): Memory[] => {
  return memories
    .map((memory) => ({
      memory,
      relevance: calculateMemoryRelevance(memory, context),
    }))
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, limit)
    .map(({ memory }) => memory);
};