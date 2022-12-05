import { GlobalGameBlackboard } from '../core/game-context';
import { EconomicType, economicTypes } from '../definitions/economic-category';
import { BaseEntityId } from '../entities';
import { Modifier } from '../entities/modifier';

interface ModifierSummary {
  add: number;
  mult: number;
  reduction: number;
}

type EconomicTypes = Record<EconomicType, ModifierSummary>;

type EconomyModifierSummary = { [k: string]: EconomicTypes };

export const getEconomyModifierSummary = (
  modifiers: Modifier[]
): EconomyModifierSummary =>
  modifiers
    .filter((modifier) => {
      const parts = modifier.name.split('_');
      economicTypes.includes(parts[parts.length - 1] as EconomicType);
    })
    .reduce<EconomyModifierSummary>((summary, modifier) => {
      const parts = modifier.name.split('_');
      const economicType = parts[parts.length - 2] as EconomicType;
      const resource = parts[parts.length - 2];

      if (!summary[resource]) {
        summary[resource] = {
          cost: { add: 0, mult: 0, reduction: 0 },
          upkeep: { add: 0, mult: 0, reduction: 0 },
          production: { add: 0, mult: 0, reduction: 0 },
        };
      }

      summary[resource][economicType][modifier.modifierType] += modifier.value;

      return summary;
    }, {});

export const getModifiersForEntity = (entityId: BaseEntityId) =>
  GlobalGameBlackboard.instance
    .getAllEntities<Modifier>('MODIFIER')
    .filter((m) => m.entityId === entityId);
