import { Entity, EntityId } from '.';
import { BuildingDefinition } from '../definitions/building';
import { LandDefinition } from '../definitions/land';
import { generateId } from '../helpers/id';

export interface Land extends Entity {
  type: 'LAND';
  name: LandDefinition['name'];
  buildings: BuildingDefinition['name'][];
  regionId: EntityId;
}

export const createLand = (
  name: LandDefinition['name'],
  regionId: EntityId
): Land => ({
  type: 'LAND',
  id: generateId(),
  name,
  buildings: [],
  regionId,
});
