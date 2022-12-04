import { GlobalGameBlackboard } from '../../core/game-context';
import { createArmy as createArmyEntity } from '../../entities/army';
import { CreateArmy } from '../create-army';

export const createArmy = (command: CreateArmy) => {
  const army = createArmyEntity(
    command.size,
    command.attack,
    command.defense,
    command.empireId,
    command.regionId
  );
  GlobalGameBlackboard.instance.addEntity(army);
  return army;
};
