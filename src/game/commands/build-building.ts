import { Command } from '.';
import { BuildingDefinition } from '../definitions/building';
import { EntityId } from '../entities';
import { EmpireId } from '../entities/empire';
import { LandId } from '../entities/land';

export interface BuildBuilding extends Command {
  action: 'BUILD_BUILDING';
  buildingName: BuildingDefinition['name'];
  landId: LandId;
  empireId: EmpireId;
}

export const buildBuilding = (
  buildingName: BuildingDefinition['name'],
  landId: LandId,
  empireId: EmpireId
): BuildBuilding => ({
  action: 'BUILD_BUILDING',
  buildingName,
  landId,
  empireId,
});
