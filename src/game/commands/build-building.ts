import { Command } from '.';
import { BuildingDefinition } from '../definitions/building';
import { EntityId } from '../entities';

export interface BuildBuilding extends Command {
  action: 'BUILD_BUILDING';
  buildingName: BuildingDefinition['name'];
  landId: EntityId;
  empireId: EntityId;
}

export const buildBuilding = (
  buildingName: BuildingDefinition['name'],
  landId: EntityId,
  empireId: EntityId
): BuildBuilding => ({
  action: 'BUILD_BUILDING',
  buildingName,
  landId,
  empireId,
});
