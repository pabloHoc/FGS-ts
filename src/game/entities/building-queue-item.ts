import { Entity, EntityId } from '.';
import { BuildingDefinition } from '../definitions/building';
import { generateId } from '../helpers/id';
import { EmpireId } from './empire';
import { LandId } from './land';

export type BuildingQueueItemId = EntityId<BuildingQueueItem>;

export interface BuildingQueueItem extends Entity {
  type: 'BUILDING_QUEUE_ITEM';
  id: BuildingQueueItemId;
  buildingName: BuildingDefinition['name'];
  order: number;
  remainingTurns: number;
  empireId: EmpireId;
  landId: LandId;
}

export const createBuildingQueueItem = (
  buildingName: BuildingDefinition['name'],
  order: number,
  remainingTurns: number,
  empireId: EmpireId,
  landId: LandId
): BuildingQueueItem => ({
  type: 'BUILDING_QUEUE_ITEM',
  id: generateId(),
  buildingName,
  order,
  remainingTurns,
  empireId,
  landId,
});
