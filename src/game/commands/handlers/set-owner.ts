import { GameContext } from '../../core/game-context';
import { Region } from '../../entities/region';
import { SetOwner } from '../set-owner';

export const setOwner = (command: SetOwner, gameContext: GameContext) => {
  const region = gameContext.getEntity<Region>('REGION', command.targetId);
  region.empireId = command.ownerId;
};
