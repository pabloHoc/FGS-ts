import { GlobalGameBlackboard } from '../../core/game-context';
import { Player } from '../../entities/player';

export const processPlayerAIs = () => {
  const players =
    GlobalGameBlackboard.instance.getAllEntities<Player>('PLAYER');

  for (const player of players) {
    if (player.isAi && player.ai) {
      player.ai.playTurn();
    }
  }
};
