import { Entity } from '.';
import { generateId } from '../helpers/id';

export interface Empire extends Entity {
  type: 'EMPIRE';
  name: string;
  isPlayer: boolean;
  /**
   * This shouldn't be here, probably it should be a separated
   * entity, like ResourceGroup? so it can be attached to other entities
   */
  resources: [
    { type: 'WOOD'; quantity: number },
    { type: 'FOOD'; quantity: number },
    { type: 'IRON'; quantity: number }
  ];
}

export const createEmpire = (name: string, isPlayer: boolean): Empire => ({
  type: 'EMPIRE',
  id: generateId(),
  name,
  isPlayer,
  resources: [
    { type: 'WOOD', quantity: 0 },
    { type: 'FOOD', quantity: 0 },
    { type: 'IRON', quantity: 0 },
  ],
});
