// * Other possible names: province, area, territory

import { Entity, EntityId } from '.';
import { Modifier } from '../definitions/modifier';
import { generateId } from '../helpers/id';

// TODO: connected region ids

export interface Region extends Entity {
  type: 'REGION';
  name: string;
  empireId?: EntityId;
  modifiers: Modifier[];
}

// ? Who owns lands creation?

export const createRegion = (name: string, empireId?: EntityId): Region => ({
  type: 'REGION',
  id: generateId(),
  name,
  empireId,
  modifiers: [],
});

export const isRegion = (entity: Entity): entity is Region =>
  entity.type === 'REGION';
