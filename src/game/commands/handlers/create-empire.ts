import { CreateEmpire } from '../create-empire';
import { GameContext } from '../../core/game-context';
import { createEmpire as createEmpireEntity } from '../../entities/empire';

export const createEmpire = (
  command: CreateEmpire,
  gameContext: GameContext
) => {
  const empire = createEmpireEntity(command.name, command.isPlayer);
  // Validation to check for only one isPlayer empire
  gameContext.addEntity(empire);
  return empire;
};
