import { GameContext } from '../../core/game-context';
import { Modifier } from '../../entities/modifier';
import { Spell } from '../../entities/spell';

export const processSpells = () => {
  const spells = GameContext.instance.getAllEntities<Spell>('SPELL');

  for (const spell of spells) {
    if (spell.remainingTime) {
      spell.remainingTime--;

      if (spell.remainingTime === 0) {
        const spellModifiers = GameContext.instance
          .getAllEntities<Modifier>('MODIFIER')
          .filter((modifier) => modifier.sourceId === spell.id);

        for (const modifier of spellModifiers) {
          GameContext.instance.deleteEntity(modifier);
        }

        GameContext.instance.deleteEntity(spell);
      }
    }
  }
};
