import { GlobalGameBlackboard } from '../core/game-context';
import { EntityId } from '../entities';
import { Region } from '../entities/region';

export const getEmpireRegions = (empireId: EntityId) =>
  GlobalGameBlackboard.instance
    .getAllEntities<Region>('REGION')
    .filter((region) => region.empireId === empireId);
