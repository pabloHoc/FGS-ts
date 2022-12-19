import { GlobalGameBlackboard } from '../../core/game-context';
import { createPlayer as createPlayerEntity } from '../../entities/player';
import { CreatePlayer } from '../create-player';

export const createPlayer = (command: CreatePlayer) => {
  const player = createPlayerEntity(
    command.name,
    command.empireId,
    command.isAI
  );
  GlobalGameBlackboard.instance.addEntity(player);
  return player;
};
