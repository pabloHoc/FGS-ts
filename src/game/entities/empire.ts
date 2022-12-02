import { Entity } from '.';
import { ResourceBlock } from '../definitions/economy-unit';
import { generateId } from '../helpers/id';
import { Planner } from '../ai/planner';
import { winGame } from '../tasks/win-game';
import { GameBlackboard } from '../core/blackboard';

export interface Empire extends Entity {
  type: 'EMPIRE';
  name: string;
  isPlayer: boolean;
  /**
   * This shouldn't be here, probably it should be a separated
   * entity, like ResourceGroup? so it can be attached to other entities
   */
  resources: ResourceBlock;
  production: ResourceBlock;
  ai?: Planner<GameBlackboard, Empire>;
}

export const createEmpire = (name: string, isPlayer = false): Empire => {
  const empire: Empire = {
    type: 'EMPIRE',
    id: generateId(),
    name,
    isPlayer,
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
  empire.ai = !isPlayer
    ? new Planner(new GameBlackboard(), empire, winGame)
    : undefined;
  return empire;
};
