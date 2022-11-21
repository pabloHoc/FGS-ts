import { DefinitionManager } from '../../core/definition-manager';
import { CommandExecutor } from '../../core/command-executor';
import { GameContext } from '../../core/game-context';
import { AgentActionDefinition } from '../../definitions/agent-action';
import { Agent, isMoveAction } from '../../entities/agent';
import { ProcessAgentActions } from '../process-agent-actions';

export const processAgentActions = (
  command: ProcessAgentActions,
  gameContext: GameContext,
  commandExecutor: CommandExecutor
) => {
  const agents = gameContext.getAllEntities<Agent>('AGENT');

  for (const agent of agents) {
    if (agent.currentAction) {
      agent.currentAction.remainingTurns--;
      if (agent.currentAction.remainingTurns === 0) {
        if (isMoveAction(agent.currentAction)) {
          // This can be turn into a setLocation command
          agent.regionId = agent.currentAction.toRegion;
        } else {
          const agentActionDefinition =
            DefinitionManager.instance.get<AgentActionDefinition>(
              'AGENT-ACTION',
              agent.currentAction.name
            );
          agentActionDefinition.execute(
            agent,
            gameContext,
            commandExecutor,
            agent.currentAction.payload
          );
        }
        delete agent.currentAction;
      }
    }
  }
};
