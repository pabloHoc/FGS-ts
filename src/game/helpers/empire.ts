import { GameContext } from '../core/game-context';
import { ResourceDefinition } from '../definitions/resource';
import { Empire } from '../entities/empire';

export const getPlayerEmpire = (gameContext: GameContext) =>
  gameContext
    .getAllEntities<Empire>('EMPIRE')
    .find((empire) => empire.isPlayer);
