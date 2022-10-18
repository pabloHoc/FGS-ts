import { MoveAgent } from '../move-agent';
import { GameContext } from '../../core/game-context';
import { Agent } from '../../entities/agent';

export const moveAgent = (command: MoveAgent, gameContext: GameContext) => {
  const agent = gameContext.getEntity<Agent>('AGENT', command.agentId);
  agent.currentAction = {
    name: 'MOVE',
    payload: {
      fromRegion: agent.regionId,
      toRegion: command.toRegionId,
    },
    remainingTurns: 2,
  };
};
