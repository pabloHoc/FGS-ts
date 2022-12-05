import { BaseEntityId, Entity, EntityId } from '.';
import { generateId } from '../helpers/id';

export type SpellId = EntityId<Spell>;

export interface Spell extends Entity {
  type: 'SPELL';
  id: SpellId;
  name: string;
  entityId: BaseEntityId; // target
  remainingTime?: number;
}

export const createSpell = (
  name: string,
  entityId: BaseEntityId,
  remainingTime?: number
): Spell => ({
  id: generateId(),
  type: 'SPELL',
  name,
  entityId,
  remainingTime,
});
