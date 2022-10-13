import { Entity } from '.';
import { ResourceType } from '../../data/resources';
import { generateId } from '../helpers/id';

export interface Empire extends Entity {
  type: 'EMPIRE';
  name: string;
  isPlayer: boolean;
  /**
   * This shouldn't be here, probably it should be a separated
   * entity, like ResourceGroup? so it can be attached to other entities
   */
  resources: Record<ResourceType, { quantity: number }>;
}

export const createEmpire = (name: string, isPlayer: boolean): Empire => ({
  type: 'EMPIRE',
  id: generateId(),
  name,
  isPlayer,
  resources: {
    WOOD: { quantity: 0 },
    FOOD: { quantity: 0 },
    IRON: { quantity: 0 },
  },
});
