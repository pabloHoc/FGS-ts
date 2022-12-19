import { GlobalGameBlackboard } from '../core/game-context';
import { Player } from '../entities/player';

export const getPlayer = () => {
  const player = GlobalGameBlackboard.instance
    .getAllEntities<Player>('PLAYER')
    .find((player) => !player.isAi);
  if (!player) throw Error('NO PLAYER FOUND');
  return player;
};
