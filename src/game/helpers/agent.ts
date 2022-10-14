import { EntityManager } from '../core/entity-manager';
import { EntityId } from '../entities';
import { Agent } from '../entities/agent';

export const getEmpireAgents = (
  empireId: EntityId,
  entityManager: EntityManager
) =>
  entityManager
    .getAll<Agent>('AGENT')
    .filter((agent) => agent.empireId === empireId);
