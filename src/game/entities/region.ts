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
  x: number;
  y: number;
  connectedTo: RegionId[];
}

export const createRegion = (
  name: string,
  x: number,
  y: number,
  empireId?: EmpireId
): Region => ({
  type: 'REGION',
  id: generateId(),
  name,
  empireId,
  x,
  y,
  connectedTo: [],
});

export const isRegion = (entity: Entity): entity is Region =>
  entity.type === 'REGION';
