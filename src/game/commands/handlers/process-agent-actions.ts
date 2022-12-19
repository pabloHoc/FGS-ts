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
    if (agent.actions[0]) {
      agent.actions[0].remainingTurns--;
      if (agent.actions[0].remainingTurns === 0) {
        if (
          agent.actions[0].name === 'move_agent' &&
          isMoveAgentPayload(agent.actions[0].payload)
        ) {
          const start = GlobalGameBlackboard.instance.getEntity<Region>(
            'REGION',
            agent.regionId
          );
          const end = GlobalGameBlackboard.instance.getEntity<Region>(
            'REGION',
            agent.actions[0].payload.region_id as RegionId
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
            agent.actions[0].remainingTurns = 1;
            CommandExecutor.instance.execute(
              setLocation(agent.id, path[1].id as RegionId)
            );
          } else if (path[1]) {
            CommandExecutor.instance.execute(
              setLocation(agent.id, path[1].id as RegionId)
            );
            agent.actions.shift();
          }
        } else if (agent.actions[0].actionType === 'action') {
          const agentActionDefinition =
            DefinitionManager.instance.get<AgentActionDefinition>(
              'AGENT-ACTION',
              agent.actions[0].name
            );
          agentActionDefinition.execute(agent, agent.actions[0].payload);
          agent.actions.shift();
        } else if (agent.actions[0].actionType === 'spell') {
          const spellDefinition =
            DefinitionManager.instance.get<SpellDefinition>(
              'SPELL',
              agent.actions[0].name
            );
          spellDefinition.execute(agent);
          agent.actions.shift();
        }
      }
    }
  }
};
