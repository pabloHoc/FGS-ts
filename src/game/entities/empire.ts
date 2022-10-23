import { Entity } from '.';
import { EconomyBlock, EconomyUnit } from '../definitions/economy-unit';
import { generateId } from '../helpers/id';

export interface Empire extends Entity {
  type: 'EMPIRE';
  name: string;
  isPlayer: boolean;
  /**
   * This shouldn't be here, probably it should be a separated
   * entity, like ResourceGroup? so it can be attached to other entities
   */
  resources: EconomyBlock;
}

export const createEmpire = (name: string, isPlayer: boolean): Empire => {
  return {
    type: 'EMPIRE',
    id: generateId(),
    name,
    isPlayer,
    resources: {
      wood: 0,
      iron: 0,
      food: 0,
    },
  };
};
