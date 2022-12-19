import { GameBlackboard } from '../../core/game-blackboard';
import { Empire } from '../../entities/empire';

export const getWoodInput = (context: GameBlackboard, empire: Empire) => {
  return empire.resources.wood;
};