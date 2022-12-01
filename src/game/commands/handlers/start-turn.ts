import { GlobalGameBlackboard } from '../../core/game-context';

export const startTurn = () => {
  GlobalGameBlackboard.instance.increaseTurn();
};
