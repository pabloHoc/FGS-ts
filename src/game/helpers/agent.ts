import { GameContext } from '../core/game-context';
import { EntityId } from '../entities';
import { Agent } from '../entities/agent';

export const getEmpireAgents = (empireId: EntityId, gameContext: GameContext) =>
  gameContext
    .getAllEntities<Agent>('AGENT')
    .filter((agent) => agent.empireId === empireId);
