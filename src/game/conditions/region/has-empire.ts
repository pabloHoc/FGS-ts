import { Condition } from '..';
import { Region } from '../../entities/region';

export const hasEmpire: Condition<Region> = (region: Region) => {
  return !!region.empireId;
};
