import { Entity, EntityId } from '.';
import { ActionKey } from '../commands/command-map';
import { Modifier } from './modifier';
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
  modifiers: Modifier[];
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
  modifiers: [],
});

export const isAgent = (entity: Entity): entity is Agent =>
  entity.type === 'AGENT';
