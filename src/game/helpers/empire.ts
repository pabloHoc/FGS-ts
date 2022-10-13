import { ResourceType } from '../../data/resources';
import { EntityManager } from '../core/entity-manager';
import { EntityId } from '../entities';
import { Empire } from '../entities/empire';
import { Region } from '../entities/region';

export const getEmpireResource = (empire: Empire, resourceType: ResourceType) =>
  empire.resources[resourceType];

export const getEmpireRegions = (
  empireId: EntityId,
  entityManager: EntityManager
) =>
  entityManager
    .getAll<Region>('REGION')
    .filter((region) => region.empireId === empireId);
