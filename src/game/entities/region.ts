// * Other possible names: province, area, territory

import { Entity, EntityId } from '.';
import { generateId } from '../helpers/id';

// TODO: connected region ids

export interface Region extends Entity {
  type: 'REGION';
  name: string;
  empireId?: EntityId;
}

// ? Who owns lands creation?

export const createRegion = (name: string, empireId?: EntityId): Region => ({
  type: 'REGION',
  id: generateId(),
  name,
  empireId,
});

export const isRegion = (entity: Entity): entity is Region =>
  entity.type === 'REGION';
