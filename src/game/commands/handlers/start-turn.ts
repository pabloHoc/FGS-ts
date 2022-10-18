import { GameContext } from '../../core/game-context';
import { StartTurn } from '../start-turn';

export const startTurn = (command: StartTurn, gameContext: GameContext) => {
  gameContext.increaseTurn();

  // update system????
};
