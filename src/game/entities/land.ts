import { Entity, EntityId } from '.';
import { BuildingDefinition } from '../definitions/building';
import { LandDefinition } from '../definitions/land';
import { Modifier } from './modifier';
import { generateId } from '../helpers/id';
import { RegionId } from './region';

export type LandId = EntityId<Land>;

export interface Land extends Entity {
  type: 'LAND';
  id: LandId;
  name: LandDefinition['name'];
  buildings: BuildingDefinition['name'][];
  regionId: RegionId;
  modifiers: Modifier[];
}

export const createLand = (
  name: LandDefinition['name'],
  regionId: RegionId
): Land => ({
  type: 'LAND',
  id: generateId(),
  name,
  buildings: [],
  regionId,
  modifiers: [],
});
