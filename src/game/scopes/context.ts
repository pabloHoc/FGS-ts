import { GameBlackboard } from '../core/game-blackboard';
import { GlobalGameBlackboard } from '../core/game-context';
import { Region } from '../entities/region';

export const getAllRegionsFromContext = (
  context: GameBlackboard = GlobalGameBlackboard.instance
) => {
  return context.getAllEntities<Region>('REGION');
};
