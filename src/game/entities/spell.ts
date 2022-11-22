import { Entity, EntityId } from '.';
import { generateId } from '../helpers/id';

export interface Spell extends Entity {
  type: 'SPELL';
  name: string;
  entityId: EntityId; // target
  remainingTime?: number;
}

export const createSpell = (
  name: string,
  entityId: EntityId,
  remainingTime?: number
): Spell => ({
  id: generateId(),
  type: 'SPELL',
  name,
  entityId,
  remainingTime,
});
