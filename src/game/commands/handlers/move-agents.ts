import { GameContext } from '../../core/game-context';
import { Agent } from '../../entities/agent';
import { MoveAgents } from '../move-agents';

export const moveAgents = (command: MoveAgents, gameContext: GameContext) => {
  const agents = gameContext.getAllEntities<Agent>('AGENT');

  for (const agent of agents) {
    if (agent.currentAction) {
      agent.currentAction.remainingTurns--;
      if (agent.currentAction.remainingTurns === 0) {
        agent.regionId = agent.currentAction.payload.toRegion;
        delete agent.currentAction;
      }
    }
  }
};
