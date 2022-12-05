import { GlobalGameBlackboard } from '../../core/game-context';
import { Region, RegionId } from '../../entities/region';
import { SetOwner } from '../set-owner';

export const setOwner = (command: SetOwner) => {
  // TODO: improve cases here
  const region = GlobalGameBlackboard.instance.getEntity<Region>(
    'REGION',
    command.targetId as RegionId
  );
  region.empireId = command.ownerId;
};
