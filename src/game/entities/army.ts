import { Entity, EntityId } from '.';
import { generateId } from '../helpers/id';

export interface Army extends Entity {
  type: 'ARMY';
  size: number;
  attack: number;
  defense: number;
  empireId: EntityId;
  regionId: EntityId;
}

export const createArmy = (
  size: number,
  attack: number,
  defense: number,
  empireId: EntityId,
  regionId: EntityId
): Army => ({
  id: generateId(),
  type: 'ARMY',
  size,
  attack,
  defense,
  empireId,
  regionId,
});
