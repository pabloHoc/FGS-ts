import { Entity, EntityId } from '.';
import {
  AgentActionDefinition,
  AgentExecutableAction,
} from '../definitions/agent-action';
import { generateId } from '../helpers/id';
import { RegionId } from './region';

export type ActionQueueItemId = EntityId<ActionQueueItem>;

// TODO: check whom this type belongs to
export type ActionType = 'action' | 'spell';

type MoveAgentPayload = { region_id: RegionId };

type ActionQueueItemPayload = MoveAgentPayload | object;

// TODO: check if this is really a queue
export interface ActionQueueItem extends Entity {
  type: 'ACTION_QUEUE_ITEM';
  id: ActionQueueItemId;
  actionType: ActionType;
  name: AgentActionDefinition['name'];
  remainingTurns: number;
  payload?: ActionQueueItemPayload;
}

export const createActionQueueItem = (
  agentActionDefinition: AgentExecutableAction,
  payload?: object
): ActionQueueItem => ({
  type: 'ACTION_QUEUE_ITEM',
  id: generateId(),
  actionType: agentActionDefinition.actionType,
  name: agentActionDefinition.name,
  remainingTurns: agentActionDefinition.baseExecutionTime,
  payload,
});

export const isMoveAgentPayload = (
  payload: ActionQueueItem['payload']
): payload is MoveAgentPayload => !!(payload as MoveAgentPayload).region_id;
