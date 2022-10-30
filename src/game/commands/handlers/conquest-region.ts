import { GameContext } from '../../core/game-context';
import { Region } from '../../entities/region';
import { ConquestRegion } from '../conquest-region';

export const conquestRegion = (
  command: ConquestRegion,
  gameContext: GameContext
) => {
  const region = gameContext.getEntity<Region>('REGION', command.regionId);

  if (region.empireId === command.empireId) {
    throw Error('TRYING TO CONQUEST REGION ALREADY OWNED');
  }

  region.empireId = command.empireId;
};
