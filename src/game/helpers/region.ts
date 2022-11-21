import { GameContext } from '../core/game-context';
import { EntityId } from '../entities';
import { Region } from '../entities/region';

export const getEmpireRegions = (empireId: EntityId) =>
  GameContext.instance
    .getAllEntities<Region>('REGION')
    .filter((region) => region.empireId === empireId);
