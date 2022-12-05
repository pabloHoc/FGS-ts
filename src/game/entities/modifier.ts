import { BaseEntityId, Entity, EntityId } from '.';
import { generateId } from '../helpers/id';

export type ModifierId = EntityId<Modifier>;

export interface Modifier extends Entity {
  type: 'MODIFIER';
  id: ModifierId;
  name: string;
  modifierType: ModifierType;
  value: number;
  entityId: BaseEntityId;
  remainingTurns?: number;
  sourceId?: string;
}

export const modifierTypes = ['add', 'mult', 'reduction'] as const;
export type ModifierType = typeof modifierTypes[number]; // flat | percent

export const createModifier = (
  name: string,
  type: ModifierType,
  value: number,
  entityId: BaseEntityId,
  remainingTurns?: number,
  sourceId?: string
): Modifier => ({
  id: generateId(),
  type: 'MODIFIER',
  name,
  modifierType: type,
  value,
  entityId,
  remainingTurns,
  sourceId,
});
