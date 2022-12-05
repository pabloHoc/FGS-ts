import { Entity, EntityId } from '.';
import { generateId } from '../helpers/id';
import { EmpireId } from './empire';

export type RegionId = EntityId<Region>;

// TODO: connected region ids
// * Other possible names: province, area, territory
export interface Region extends Entity {
  type: 'REGION';
  id: RegionId;
  name: string;
  empireId?: EmpireId;
}

export const createRegion = (name: string, empireId?: EmpireId): Region => ({
  type: 'REGION',
  id: generateId(),
  name,
  empireId,
});

export const isRegion = (entity: Entity): entity is Region =>
  entity.type === 'REGION';
