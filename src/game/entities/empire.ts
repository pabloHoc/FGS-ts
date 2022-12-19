import { Entity, EntityId } from '.';
import { ResourceBlock } from '../definitions/economy-unit';
import { generateId } from '../helpers/id';

export type EmpireId = EntityId<Empire>;
export interface Empire extends Entity {
  type: 'EMPIRE';
  id: EmpireId;
  name: string;
  /**
   * This shouldn't be here, probably it should be a separated
   * entity, like ResourceGroup? so it can be attached to other entities
   */
  resources: ResourceBlock;
  production: ResourceBlock;
}

export const createEmpire = (name: string): Empire => {
  const empire: Empire = {
    type: 'EMPIRE',
    id: generateId(),
    name,
    resources: {
      wood: 0,
      iron: 0,
      food: 0,
    },
    production: {
      wood: 0,
      iron: 0,
      food: 0,
    },
  };
  return empire;
};
