import { MoveAgent } from '../commands/move-agent';
import { EntityManager } from '../core/entity-manager';
import { Agent } from '../entities/agent';

export const moveAgent = (command: MoveAgent, entityManager: EntityManager) => {
  const agent = entityManager.get<Agent>('AGENT', command.agentId);
  agent.currentAction = {
    name: 'MOVE',
    payload: {
      fromRegion: agent.regionId,
      toRegion: command.toRegionId,
    },
    remainingTurns: 2,
  };
};
