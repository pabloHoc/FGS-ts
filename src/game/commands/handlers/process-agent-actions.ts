import { DefinitionManager } from '../../core/definition-manager';
import { GameContext } from '../../core/game-context';
import { AgentActionDefinition } from '../../definitions/agent-action';
import { Agent, isMoveAction } from '../../entities/agent';
import { ProcessAgentActions } from '../process-agent-actions';
import { SpellDefinition } from '../../definitions/spell';

export const processAgentActions = (command: ProcessAgentActions) => {
  const agents = GameContext.instance.getAllEntities<Agent>('AGENT');

  for (const agent of agents) {
    if (agent.currentAction) {
      agent.currentAction.remainingTurns--;
      if (agent.currentAction.remainingTurns === 0) {
        if (isMoveAction(agent.currentAction)) {
          // This can be turn into a setLocation command
          agent.regionId = agent.currentAction.toRegion;
        } else if (agent.currentAction.actionType === 'action') {
          const agentActionDefinition =
            DefinitionManager.instance.get<AgentActionDefinition>(
              'AGENT-ACTION',
              agent.currentAction.name
            );
          agentActionDefinition.execute(agent, agent.currentAction.payload);
        } else if (agent.currentAction.actionType === 'spell') {
          const spellDefinition =
            DefinitionManager.instance.get<SpellDefinition>(
              'SPELL',
              agent.currentAction.name
            );
          spellDefinition.execute(agent);
        }
        delete agent.currentAction;
      }
    }
  }
};
