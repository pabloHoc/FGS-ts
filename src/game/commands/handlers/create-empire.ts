import { CreateEmpire } from '../create-empire';
import { GlobalGameBlackboard } from '../../core/game-context';
import { createEmpire as createEmpireEntity } from '../../entities/empire';

export const createEmpire = (command: CreateEmpire) => {
  const empire = createEmpireEntity(command.name, command.isPlayer);
  // TODO: Validation to check for only one isPlayer empire
  GlobalGameBlackboard.instance.addEntity(empire);
  return empire;
};
