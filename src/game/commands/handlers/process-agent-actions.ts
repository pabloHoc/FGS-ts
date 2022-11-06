import { DefinitionManager } from '../../core/definition-manager';
import { Dispatcher } from '../../core/dispatcher';
import { GameContext } from '../../core/game-context';
import { AgentActionDefinition } from '../../definitions/agent-action';
import { Agent, isMoveAction } from '../../entities/agent';
import { ProcessAgentActions } from '../process-agent-actions';

export const processAgentActions = (
  command: ProcessAgentActions,
  gameContext: GameContext,
  definitionManager: DefinitionManager,
  dispatcher: Dispatcher
) => {
  const agents = gameContext.getAllEntities<Agent>('AGENT');

  for (const agent of agents) {
    if (agent.currentAction && !isMoveAction(agent.currentAction)) {
      agent.currentAction.remainingTurns--;

      if (agent.currentAction.remainingTurns === 0) {
        const agentActionDefinition =
          definitionManager.get<AgentActionDefinition>(
            'AGENT-ACTION',
            agent.currentAction.name
          );
        agentActionDefinition.execute(agent, gameContext, dispatcher);
        agent.currentAction = undefined;
      }
    }
  }
};
