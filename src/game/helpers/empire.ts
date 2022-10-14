import { EntityManager } from '../core/entity-manager';
import { ResourceDefinition } from '../definitions/resource';
import { Empire } from '../entities/empire';

export const getPlayerEmpire = (entityManager: EntityManager) =>
  entityManager.getAll<Empire>('EMPIRE').find((empire) => empire.isPlayer);
