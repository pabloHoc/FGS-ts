import { GlobalGameBlackboard } from '../core/game-context';
import { EmpireId } from '../entities/empire';
import { Region } from '../entities/region';

export const getEmpireRegions = (empireId: EmpireId) =>
  GlobalGameBlackboard.instance
    .getAllEntities<Region>('REGION')
    .filter((region) => region.empireId === empireId);
