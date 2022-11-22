import { Entity, EntityId } from '.';
import { generateId } from '../helpers/id';

export interface Army extends Entity {
  type: 'ARMY';
  size: number;
  empireId: EntityId;
  regionId: EntityId;
}

export const createArmy = (
  size: number,
  empireId: EntityId,
  regionId: EntityId
): Army => ({
  id: generateId(),
  type: 'ARMY',
  size,
  empireId,
  regionId,
});
