import { CreateEmpire } from '../create-empire';
import { GameContext } from '../../core/game-context';
import { createEmpire as createEmpireEntity } from '../../entities/empire';
import { Modifier, modifierTypes } from '../../definitions/modifier';
import economicCategories from '../../../data/economic-categories';
import { economicTypes } from '../../helpers/modifiers';

const getEconomicModifiers = () => {
  const modifiers: Modifier[] = [];
  for (const economicModifier of Object.keys(economicCategories)) {
    for (const economicType of economicTypes) {
      for (const modifierType of modifierTypes) {
        const modifier: Modifier = {
          name: `${economicModifier}_${economicType}`,
          type: modifierType,
          value: 0,
        };
        modifiers.push(modifier);
      }
    }
  }
  return modifiers;
};

export const createEmpire = (
  command: CreateEmpire,
  gameContext: GameContext
) => {
  const empire = createEmpireEntity(command.name, command.isPlayer);
  // Validation to check for only one isPlayer empire
  // empire.modifiers = getEconomsicModifiers();
  gameContext.addEntity(empire);
  return empire;
};
