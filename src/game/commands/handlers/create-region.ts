import { createRegion as createRegionEntity } from '../../entities/region';
import { GameContext } from '../../core/game-context';
import { CreateRegion } from '../create-region';

export const createRegion = (
  command: CreateRegion,
  gameContext: GameContext
) => {
  const region = createRegionEntity(command.name, command.empireId);
  gameContext.addEntity(region);
  return region;
};
