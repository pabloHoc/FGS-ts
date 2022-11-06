import { Condition } from '..';
import { Empire } from '../../entities/empire';

export const isPlayer = (empire: Empire) => {
  return !!empire.isPlayer;
};
