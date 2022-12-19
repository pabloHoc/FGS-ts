import { Condition } from '..';
import { GameBlackboard } from '../../core/game-blackboard';
import { Empire } from '../../entities/empire';

export const hasIron =
  (value: number) => (context: GameBlackboard, empire: Empire) => {
    return empire.resources.iron > value;
  };
