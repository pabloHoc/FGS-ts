import { GameBlackboard } from '../../core/game-blackboard';
import { Region } from '../../entities/region';
import { getRegionLands } from '../../helpers/land';

export const grasslandNumberInput = (context: GameBlackboard, region: Region) =>
  getRegionLands(region.id, context).filter((land) => land.name === 'grassland')
    .length;
