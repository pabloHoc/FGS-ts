import { DefinitionManager } from '../../core/definition-manager';
import { CommandExecutor } from '../../core/command-executor';
import { GlobalGameBlackboard } from '../../core/game-context';
import { BuildingQueueItem } from '../../entities/building-queue-item';
import { Land } from '../../entities/land';
import { getSortedBuildingQueueForLand } from '../../helpers/building';
import { buildBuilding } from '../build-building';
import { ProcessBuildingQueues } from '../process-building-queues';

// TODO: There should be commands for:
// - add building to queue
// - remove building from
// - finish building from queue
export const processBuildingQueues = (command: ProcessBuildingQueues) => {
  const lands = GlobalGameBlackboard.instance.getAllEntities<Land>('LAND');

  for (const land of lands) {
    const buildingQueue = getSortedBuildingQueueForLand(land.id);

    if (buildingQueue.length) {
      const nextBuilding = buildingQueue[0];
      nextBuilding.remainingTurns--;

      if (nextBuilding.remainingTurns === 0) {
        for (const queueItem of buildingQueue) {
          queueItem.order--;
        }
        CommandExecutor.instance.execute(
          buildBuilding(
            nextBuilding.buildingName,
            nextBuilding.landId,
            nextBuilding.empireId
          )
        );
        GlobalGameBlackboard.instance.deleteEntity<BuildingQueueItem>(
          nextBuilding
        );
      }
    }
  }
};
