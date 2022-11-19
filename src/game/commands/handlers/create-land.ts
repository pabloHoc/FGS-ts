import { CreateLand } from '../create-land';
import { GameContext } from '../../core/game-context';
import { createLand as createLandEntity } from '../../entities/land';

export const createLand = (command: CreateLand, gameContext: GameContext) => {
  const land = createLandEntity(command.name, command.regionId);
  gameContext.addEntity(land);
  return land;
};
