import { GameBlackboard } from '../../core/game-blackboard';
import { Empire } from '../../entities/empire';
import { Player } from '../../entities/player';

export const isPlayer = () => (context: GameBlackboard, empire: Empire) => {
  return !!context
    .getAllEntities<Player>('PLAYER')
    .find((player) => player.empireId === empire.id);
};
