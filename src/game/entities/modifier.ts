// ? Where should this be? It's not a definition, types maybe?

import { Entity, EntityId } from '.';
import { generateId } from '../helpers/id';

export interface Modifier extends Entity {
  type: 'MODIFIER';
  name: string;
  modifierType: ModifierType;
  value: number;
  entityId: EntityId;
  remainingTurns?: number;
  sourceId?: string;
}

export const modifierTypes = ['add', 'mult', 'reduction'] as const;
export type ModifierType = typeof modifierTypes[number]; // flat | percent

export const createModifier = (
  name: string,
  type: ModifierType,
  value: number,
  entityId: EntityId,
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
