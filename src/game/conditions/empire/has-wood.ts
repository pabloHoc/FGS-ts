import { Condition } from '..';
import { GameBlackboard } from '../../core/game-blackboard';
import { Empire } from '../../entities/empire';

export const hasWood =
  (value: number) => (context: GameBlackboard, empire: Empire) => {
    return empire.resources.wood > value;
  };
