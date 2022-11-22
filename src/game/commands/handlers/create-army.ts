import { GameContext } from '../../core/game-context';
import { createArmy as createArmyEntity } from '../../entities/army';
import { CreateArmy } from '../create-army';

export const createArmy = (command: CreateArmy) => {
  const army = createArmyEntity(
    command.size,
    command.empireId,
    command.regionId
  );
  GameContext.instance.addEntity(army);
  return army;
};
