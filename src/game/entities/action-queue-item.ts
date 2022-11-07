import { Entity, EntityId } from '.';
import { AgentActionDefinition } from '../definitions/agent-action';
import { generateId } from '../helpers/id';

// ? is it really a queue?
export interface ActionQueueItem extends Entity {
  type: 'ACTION_QUEUE_ITEM';
  id: EntityId;
  name: AgentActionDefinition['name'];
  order: number;
  remainingTurns: number;
  payload?: object;
}

export const createActionQueueItem = (
  agentActionDefinition: AgentActionDefinition,
  order: number,
  payload?: object
): ActionQueueItem => ({
  type: 'ACTION_QUEUE_ITEM',
  id: generateId(),
  name: agentActionDefinition.name,
  order,
  remainingTurns: agentActionDefinition.baseExecutionTime,
  payload,
});
