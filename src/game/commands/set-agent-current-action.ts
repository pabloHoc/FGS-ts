import { Command } from '.';
import { ActionQueueItem } from '../entities/action-queue-item';
import { AgentId } from '../entities/agent';

export interface SetAgentCurrentAction extends Command {
  action: 'SET_AGENT_CURRENT_ACTION';
  agentId: AgentId;
  newCurrentAction: ActionQueueItem;
}

export const setAgentCurrentAction = (
  agentId: AgentId,
  newCurrentAction: ActionQueueItem
): SetAgentCurrentAction => ({
  action: 'SET_AGENT_CURRENT_ACTION',
  agentId,
  newCurrentAction,
});
