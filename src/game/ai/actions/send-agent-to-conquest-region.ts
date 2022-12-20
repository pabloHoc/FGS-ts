import { DefinitionManager } from '../../core/definition-manager';
import { GameBlackboard } from '../../core/game-blackboard';
import { GlobalGameBlackboard } from '../../core/game-context';
import { AgentActionDefinition } from '../../definitions/agent-action';
import { createActionQueueItem } from '../../entities/action-queue-item';
import { Empire } from '../../entities/empire';
import { Region } from '../../entities/region';
import { getEmpireAgents } from '../../helpers/agent';
import { getAgentCurrentRegion } from '../../helpers/region';

export const sendAgentToConquestRegion = (
  context: GameBlackboard,
  empire: Empire
) => {
  const agents = getEmpireAgents(empire.id);
  for (const agent of agents) {
    if (!agent.actions.length) {
      const currentRegion = getAgentCurrentRegion(agent);
      const nextRegion = GlobalGameBlackboard.instance.getEntity<Region>(
        'REGION',
        currentRegion.connectedTo[0]
      );
      const moveAction = DefinitionManager.instance.get<AgentActionDefinition>(
        'AGENT-ACTION',
        'move_agent'
      );
      const conquestAction =
        DefinitionManager.instance.get<AgentActionDefinition>(
          'AGENT-ACTION',
          'conquest_region'
        );
      agent.actions.push(
        createActionQueueItem(moveAction, {
          region_id: nextRegion.id,
        })
      );
      agent.actions.push(createActionQueueItem(conquestAction));
    }
  }
};
