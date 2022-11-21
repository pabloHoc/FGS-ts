import { CreateLand } from '../create-land';
import { GameContext } from '../../core/game-context';
import { createLand as createLandEntity } from '../../entities/land';

export const createLand = (command: CreateLand) => {
  const land = createLandEntity(command.name, command.regionId);
  GameContext.instance.addEntity(land);
  return land;
};
