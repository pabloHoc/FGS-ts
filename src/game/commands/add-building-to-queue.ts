import { Command } from '.';
import { BuildingDefinition } from '../definitions/building';
import { EntityId } from '../entities';
import { EmpireId } from '../entities/empire';
import { LandId } from '../entities/land';

export interface AddBuildingToQueue extends Command {
  action: 'ADD_BUILDING_TO_QUEUE';
  name: BuildingDefinition['name'];
  landId: LandId;
  empireId: EmpireId;
}

export const addBuildingToQueue = (
  buildingName: BuildingDefinition['name'],
  landId: LandId,
  empireId: EmpireId
): AddBuildingToQueue => ({
  action: 'ADD_BUILDING_TO_QUEUE',
  name: buildingName,
  landId,
  empireId,
});
