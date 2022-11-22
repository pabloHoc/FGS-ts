import { Entity, EntityId } from '.';
import { generateId } from '../helpers/id';

// TODO: connected region ids
// * Other possible names: province, area, territory
export interface Region extends Entity {
  type: 'REGION';
  name: string;
  empireId?: EntityId;
}

export const createRegion = (name: string, empireId?: EntityId): Region => ({
  type: 'REGION',
  id: generateId(),
  name,
  empireId,
});

export const isRegion = (entity: Entity): entity is Region =>
  entity.type === 'REGION';
