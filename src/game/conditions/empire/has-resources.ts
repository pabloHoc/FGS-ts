import { Condition } from '..';
import { GameBlackboard } from '../../core/blackboard';
import { Empire } from '../../entities/empire';

export const hasResources: Condition<GameBlackboard, Empire> = (
  context: GameBlackboard,
  empire: Empire
) => {
  return empire.resources.wood > 10;
};
