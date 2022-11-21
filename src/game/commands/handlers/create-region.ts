import { createRegion as createRegionEntity } from '../../entities/region';
import { GameContext } from '../../core/game-context';
import { CreateRegion } from '../create-region';

export const createRegion = (command: CreateRegion) => {
  const region = createRegionEntity(command.name, command.empireId);
  GameContext.instance.addEntity(region);
  return region;
};
