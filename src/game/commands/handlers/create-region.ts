import { createRegion as createRegionEntity } from '../../entities/region';
import { GlobalGameBlackboard } from '../../core/game-context';
import { CreateRegion } from '../create-region';

export const createRegion = (command: CreateRegion) => {
  const region = createRegionEntity(command.name, command.empireId);
  GlobalGameBlackboard.instance.addEntity(region);
  return region;
};
