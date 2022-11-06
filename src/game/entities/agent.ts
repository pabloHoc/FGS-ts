import { Entity, EntityId } from '.';
import { Action } from '../commands/command-map';
import { generateId } from '../helpers/id';
import { ActionQueueItem } from './action-queue-item';

interface MoveAction {
  name: 'MOVE';
  fromRegion: EntityId;
  toRegion: EntityId;
  remainingTurns: number;
}

export const isMoveAction = (
  action: MoveAction | ActionQueueItem
): action is MoveAction => action.name === 'MOVE';

export interface Agent extends Entity {
  type: 'AGENT';
  name: string;
  empireId: EntityId;
  // Current location
  regionId: EntityId;
  mp: number;
  currentAction?: MoveAction | ActionQueueItem;
}

export const createAgent = (
  name: string,
  empireId: EntityId,
  regionId: EntityId
): Agent => ({
  type: 'AGENT',
  id: generateId(),
  name,
  empireId,
  regionId,
  mp: 10,
});

export const isAgent = (entity: Entity): entity is Agent =>
  entity.type === 'AGENT';
