import { Condition } from '..';
import { GameBlackboard } from '../../core/blackboard';
import { Empire } from '../../entities/empire';

export const isPlayer: Condition<GameBlackboard, Empire> = (
  context: GameBlackboard,
  empire: Empire
) => {
  return !!empire.isPlayer;
};
