import { GlobalGameBlackboard } from '../../core/game-context';
import { Region } from '../../entities/region';
import { SetOwner } from '../set-owner';

export const setOwner = (command: SetOwner) => {
  const region = GlobalGameBlackboard.instance.getEntity<Region>(
    'REGION',
    command.targetId
  );
  region.empireId = command.ownerId;
};
