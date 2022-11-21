import { DefinitionManager } from '../../core/definition-manager';
import { GameContext } from '../../core/game-context';
import { BuildingDefinition } from '../../definitions/building';
import {
  BuildingQueueItem,
  createBuildingQueueItem,
} from '../../entities/building-queue-item';
import { Empire } from '../../entities/empire';
import {
  getSortedBuildingQueueForLand,
  getLastBuildingQueueOrder,
} from '../../helpers/building';
import { AddBuildingToQueue } from '../add-building-to-queue';

export const addBuildingToQueue = (command: AddBuildingToQueue) => {
  const buildingQueue = getSortedBuildingQueueForLand(command.landId);
  const lastBuildingInQueue = buildingQueue[buildingQueue.length - 1];
  const nextBuildingQueueOrder = lastBuildingInQueue
    ? lastBuildingInQueue.order + 1
    : 0;
  const buildingDefinition = DefinitionManager.instance.get<BuildingDefinition>(
    'BUILDING',
    command.name
  );
  const newBuildingQueueItem = createBuildingQueueItem(
    command.name,
    nextBuildingQueueOrder,
    buildingDefinition.baseBuildtime,
    command.empireId,
    command.landId
  );

  // Apply building costs
  const empire = GameContext.instance.getEntity<Empire>(
    'EMPIRE',
    command.empireId
  );
  for (const [resource, cost = 0] of Object.entries(
    buildingDefinition.resources.cost
  )) {
    if (empire.resources[resource] < cost)
      throw new Error('Resources not enough');

    empire.resources[resource] -= cost;
  }

  GameContext.instance.addEntity<BuildingQueueItem>(newBuildingQueueItem);
};
