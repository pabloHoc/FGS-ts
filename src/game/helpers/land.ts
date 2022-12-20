import { GameBlackboard } from '../core/game-blackboard';
import { GlobalGameBlackboard } from '../core/game-context';
import { Land } from '../entities/land';
import { RegionId } from '../entities/region';

export const getRegionLands = (
  regionId: RegionId,
  context: GameBlackboard = GlobalGameBlackboard.instance
) =>
  context
    .getAllEntities<Land>('LAND')
    .filter((land) => land.regionId === regionId);
