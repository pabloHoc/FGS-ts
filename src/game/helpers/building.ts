import { GlobalGameBlackboard } from '../core/game-context';
import { BuildingQueueItem } from '../entities/building-queue-item';
import { LandId } from '../entities/land';

export const getSortedBuildingQueueForLand = (landId: LandId) => {
  const buildingQueueItems =
    GlobalGameBlackboard.instance.getAllEntities<BuildingQueueItem>(
      'BUILDING_QUEUE_ITEM'
    );
  return buildingQueueItems
    .filter((items) => items.landId === landId)
    .sort((a, b) => a.order - b.order);
};

export const getLastBuildingQueueOrder = (
  buildingQueueItems: BuildingQueueItem[]
) =>
  buildingQueueItems.reduce<number>((highestOrder, buidingQueueItem) => {
    return buidingQueueItem.order > highestOrder
      ? buidingQueueItem.order
      : highestOrder;
  }, 0);
