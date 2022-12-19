import { GameBlackboard } from '../../core/game-blackboard';
import { Region } from '../../entities/region';

export const hasEmpire =
  (value: boolean) => (context: GameBlackboard, region: Region) => {
    return !!region.empireId === value;
  };
