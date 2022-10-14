import { EntityManager } from '../core/entity-manager';
import { EntityId } from '../entities';
import { Region } from '../entities/region';

export const getEmpireRegions = (
  empireId: EntityId,
  entityManager: EntityManager
) =>
  entityManager
    .getAll<Region>('REGION')
    .filter((region) => region.empireId === empireId);
