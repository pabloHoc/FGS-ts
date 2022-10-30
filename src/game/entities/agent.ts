import { Entity, EntityId } from '.';
import { generateId } from '../helpers/id';

interface MoveAction {
  name: 'MOVE';
  payload: {
    fromRegion: EntityId;
    toRegion: EntityId;
  };
  remainingTurns: number;
}

type AgentAction = MoveAction;

export interface Agent extends Entity {
  type: 'AGENT';
  name: string;
  empireId: EntityId;
  // Current location
  regionId: EntityId;
  mp: number;
  currentAction?: AgentAction;
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
