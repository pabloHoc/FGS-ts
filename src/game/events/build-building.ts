import { GameEvent } from '../../core/event-manager';
import { BuildingDefinition } from '../definitions/building';
import { EntityId } from '../entities';

export interface BuildBuilding extends GameEvent {
  type: 'BUILD_BUILDING';
  buildingName: BuildingDefinition['name'];
  landId: EntityId;
  empireId: EntityId;
}

export const buildBuilding = (
  buildingName: BuildingDefinition['name'],
  landId: EntityId,
  empireId: EntityId
): BuildBuilding => ({
  type: 'BUILD_BUILDING',
  buildingName,
  landId,
  empireId,
});
