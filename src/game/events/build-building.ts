import { GameEvent } from '../../core/event-manager';
import { BuildingType } from '../../data/buildings';
import { EntityId } from '../entities';

export interface BuildBuilding extends GameEvent {
  type: 'BUILD_BUILDING';
  buildingName: BuildingType;
  landId: EntityId;
}

export const buildBuilding = (
  buildingName: BuildingType,
  landId: EntityId
): BuildBuilding => ({
  type: 'BUILD_BUILDING',
  buildingName,
  landId,
});
