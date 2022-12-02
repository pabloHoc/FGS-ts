import { Condition } from '..';
import { GameBlackboard } from '../../core/blackboard';
import { Region } from '../../entities/region';

export const hasEmpire = () => (context: GameBlackboard, region: Region) => {
  return !!region.empireId;
};
