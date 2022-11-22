import { GameContext } from '../../core/game-context';

export const startTurn = () => {
  GameContext.instance.increaseTurn();
};
