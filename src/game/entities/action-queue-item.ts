import { Entity, EntityId } from '.';
import {
  AgentActionDefinition,
  AgentExecutableAction,
} from '../definitions/agent-action';
import { generateId } from '../helpers/id';

// TODO: check whom this type belongs to
export type ActionType = 'action' | 'spell';

// TODO: check if this is really a queue
export interface ActionQueueItem extends Entity {
  type: 'ACTION_QUEUE_ITEM';
  id: EntityId;
  actionType: ActionType;
  name: AgentActionDefinition['name'];
  order: number;
  remainingTurns: number;
  payload?: object;
}

export const createActionQueueItem = (
  agentActionDefinition: AgentExecutableAction,
  order: number,
  payload?: object
): ActionQueueItem => ({
  type: 'ACTION_QUEUE_ITEM',
  id: generateId(),
  actionType: agentActionDefinition.actionType,
  name: agentActionDefinition.name,
  order,
  remainingTurns: agentActionDefinition.baseExecutionTime,
  payload,
});
