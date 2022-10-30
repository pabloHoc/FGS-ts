import { Condition } from '..';
import { Empire } from '../../entities/empire';

export const isPlayer: Condition<Empire> = (empire: Empire) => {
  return !!empire.isPlayer;
};
