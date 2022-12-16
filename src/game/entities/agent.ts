import { Entity, EntityId } from '.';
import { ActionKey } from '../commands/command-map';
import { Modifier } from './modifier';
import { generateId } from '../helpers/id';
import { ActionQueueItem } from './action-queue-item';
import { EmpireId } from './empire';
import { RegionId } from './region';

export type AgentId = EntityId<Agent>;
export interface MoveAction {
  id: AgentId;
  name: 'MOVE';
  fromRegion: RegionId;
  toRegion: RegionId;
  remainingTurns: number;
}

export const isMoveAction = (
  action: MoveAction | ActionQueueItem
): action is MoveAction => action.name === 'MOVE';

export interface Agent extends Entity {
  type: 'AGENT';
  id: AgentId;
  name: string;
  empireId: EmpireId;
  // Current location
  regionId: RegionId;
  mp: number;
  modifiers: Modifier[];
  currentAction?: MoveAction | ActionQueueItem;
}

export const createAgent = (
  name: string,
  empireId: EmpireId,
  regionId: RegionId
): Agent => ({
  type: 'AGENT',
  id: generateId<Agent>(),
  name,
  empireId,
  regionId,
  mp: 10,
  modifiers: [],
});

export const isAgent = (entity: Entity): entity is Agent =>
  entity.type === 'AGENT';
