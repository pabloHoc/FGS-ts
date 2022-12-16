import { Condition } from '..';
import { GameBlackboard } from '../../core/blackboard';
import { Region } from '../../entities/region';

export const hasEmpire =
  (value: boolean) => (context: GameBlackboard, region: Region) => {
    return !!region.empireId === value;
  };
