import { GameBlackboard } from '../../core/game-blackboard';
import { Land } from '../../entities/land';

export const isLandType =
  (type: string) => (context: GameBlackboard, land: Land) =>
    land.name === type;
