import { Condition } from '..';
import { GameBlackboard } from '../../core/blackboard';
import { Empire } from '../../entities/empire';

export const hasFood =
  (value: number) => (context: GameBlackboard, empire: Empire) => {
    return empire.resources.food > value;
  };
