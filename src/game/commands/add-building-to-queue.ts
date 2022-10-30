import { Command } from '.';
import { BuildingDefinition } from '../definitions/building';
import { EntityId } from '../entities';

export interface AddBuildingToQueue extends Command {
  action: 'ADD_BUILDING_TO_QUEUE';
  name: BuildingDefinition['name'];
  landId: EntityId;
  empireId: EntityId;
}

export const addBuildingToQueue = (
  buildingName: BuildingDefinition['name'],
  landId: EntityId,
  empireId: EntityId
): AddBuildingToQueue => ({
  action: 'ADD_BUILDING_TO_QUEUE',
  name: buildingName,
  landId,
  empireId,
});
