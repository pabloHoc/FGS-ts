import { DefinitionManager } from '../../core/definition-manager';
import { Dispatcher } from '../../core/dispatcher';
import { GameContext } from '../../core/game-context';
import { BuildingQueueItem } from '../../entities/building-queue-item';
import { Land } from '../../entities/land';
import { getSortedBuildingQueueForLand } from '../../helpers/building';
import { buildBuilding } from '../build-building';
import { ProcessBuildingQueues } from '../process-building-queues';

export const processBuildingQueues = (
  command: ProcessBuildingQueues,
  gameContext: GameContext,
  definitionManager: DefinitionManager,
  dispatcher: Dispatcher
) => {
  const lands = gameContext.getAllEntities<Land>('LAND');

  for (const land of lands) {
    const buildingQueue = getSortedBuildingQueueForLand(land.id, gameContext);

    if (!buildingQueue.length) return;

    const nextBuilding = buildingQueue[0];
    nextBuilding.remainingTurns--;

    if (nextBuilding.remainingTurns === 0) {
      for (const queueItem of buildingQueue) {
        queueItem.order--;
      }
      dispatcher.execute(
        buildBuilding(
          nextBuilding.buildingName,
          nextBuilding.landId,
          nextBuilding.empireId
        )
      );
      gameContext.deleteEntity<BuildingQueueItem>(nextBuilding);
    }
  }
};
