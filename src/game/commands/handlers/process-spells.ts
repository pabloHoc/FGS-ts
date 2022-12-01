import { GlobalGameBlackboard } from '../../core/game-context';
import { Modifier } from '../../entities/modifier';
import { Spell } from '../../entities/spell';

export const processSpells = () => {
  const spells = GlobalGameBlackboard.instance.getAllEntities<Spell>('SPELL');

  for (const spell of spells) {
    if (spell.remainingTime) {
      spell.remainingTime--;

      if (spell.remainingTime === 0) {
        const spellModifiers = GlobalGameBlackboard.instance
          .getAllEntities<Modifier>('MODIFIER')
          .filter((modifier) => modifier.sourceId === spell.id);

        for (const modifier of spellModifiers) {
          GlobalGameBlackboard.instance.deleteEntity(modifier);
        }

        GlobalGameBlackboard.instance.deleteEntity(spell);
      }
    }
  }
};
