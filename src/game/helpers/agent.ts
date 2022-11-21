import { GameContext } from '../core/game-context';
import { EntityId } from '../entities';
import { Agent } from '../entities/agent';

export const getEmpireAgents = (empireId: EntityId) =>
  GameContext.instance
    .getAllEntities<Agent>('AGENT')
    .filter((agent) => agent.empireId === empireId);
