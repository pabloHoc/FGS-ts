import { DefinitionManager } from '../../core/definition-manager';
import { GlobalGameBlackboard } from '../../core/game-context';
import { AgentActionDefinition } from '../../definitions/agent-action';
import { Agent } from '../../entities/agent';
import { ProcessAgentActions } from '../process-agent-actions';
import { SpellDefinition } from '../../definitions/spell';
import { findPath, regionsToNodes, regionToNode } from '../../core/pathfinding';
import { Region, RegionId } from '../../entities/region';
import { CommandExecutor } from '../../core/command-executor';
import { setLocation } from '../set-location';
import { isMoveAgentPayload } from '../../entities/action-queue-item';

export const processAgentActions = () => {
  const agents = GlobalGameBlackboard.instance.getAllEntities<Agent>('AGENT');

  for (const agent of agents) {
    if (agent.currentAction) {
      agent.currentAction.remainingTurns--;
      if (agent.currentAction.remainingTurns === 0) {
        if (
          agent.currentAction.name === 'move_agent' &&
          isMoveAgentPayload(agent.currentAction.payload)
        ) {
          const start = GlobalGameBlackboard.instance.getEntity<Region>(
            'REGION',
            agent.regionId
          );
          const end = GlobalGameBlackboard.instance.getEntity<Region>(
            'REGION',
            agent.currentAction.payload.region_id as RegionId
          );
          const path = findPath(
            regionToNode(start),
            regionToNode(end),
            regionsToNodes(
              GlobalGameBlackboard.instance.getAllEntities<Region>('REGION')
            )
          );

          if (path[2]) {
            // TODO: review turns in move action
            agent.currentAction.remainingTurns = 1;
            CommandExecutor.instance.execute(
              setLocation(agent.id, path[1].id as RegionId)
            );
          } else if (path[1]) {
            CommandExecutor.instance.execute(
              setLocation(agent.id, path[1].id as RegionId)
            );
            delete agent.currentAction;
          }
        } else if (agent.currentAction.actionType === 'action') {
          const agentActionDefinition =
            DefinitionManager.instance.get<AgentActionDefinition>(
              'AGENT-ACTION',
              agent.currentAction.name
            );
          agentActionDefinition.execute(agent, agent.currentAction.payload);
          delete agent.currentAction;
        } else if (agent.currentAction.actionType === 'spell') {
          const spellDefinition =
            DefinitionManager.instance.get<SpellDefinition>(
              'SPELL',
              agent.currentAction.name
            );
          spellDefinition.execute(agent);
          delete agent.currentAction;
        }
      }
    }
  }
};
