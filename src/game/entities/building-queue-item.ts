import { Entity, EntityId } from '.';
import { BuildingDefinition } from '../definitions/building';
import { generateId } from '../helpers/id';

export interface BuildingQueueItem extends Entity {
  type: 'BUILDING_QUEUE_ITEM';
  id: EntityId;
  buildingName: BuildingDefinition['name'];
  order: number;
  remainingTurns: number;
  empireId: EntityId;
  landId: EntityId;
}

export const createBuildingQueueItem = (
  buildingName: BuildingDefinition['name'],
  order: number,
  remainingTurns: number,
  empireId: EntityId,
  landId: EntityId
): BuildingQueueItem => ({
  type: 'BUILDING_QUEUE_ITEM',
  id: generateId(),
  buildingName,
  order,
  remainingTurns,
  empireId,
  landId,
});
