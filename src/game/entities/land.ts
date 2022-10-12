import { Entity, EntityId } from '.';
import { BuildingType } from '../../data/buildings';
import { LandData, LandType } from '../../data/lands';
import { generateId } from '../helpers/id';

export interface Land extends Entity {
  type: 'LAND';
  landType: LandType;
  buildings: BuildingType[];
  regionId: EntityId;
}

// ? Should lands have a pointer to their parent region?

export const createLand = (landType: LandType, regionId: EntityId): Land => ({
  type: 'LAND',
  id: generateId(),
  landType,
  buildings: [],
  regionId,
});
