import { Condition } from '..';
import { GameBlackboard } from '../../core/blackboard';
import { Region } from '../../entities/region';

export const hasEmpire: Condition<GameBlackboard, Region> = (
  context: GameBlackboard,
  region: Region
) => {
  return !!region.empireId;
};
