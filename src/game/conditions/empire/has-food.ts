import { GameBlackboard } from '../../core/blackboard';
import { Empire } from '../../entities/empire';

/**
 * TODO:
 * - this should never be a condition, we should handle resource costs in logic
 * - in any case, this should be a generic hasResource(value, resource)
 */
export const hasFood =
  (value: number) => (context: GameBlackboard, empire: Empire) => {
    return empire.resources.food > value;
  };
