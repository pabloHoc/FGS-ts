import { Modifier } from '../definitions/modifier';

interface ModifierSummary {
  add: number;
  mult: number;
  reduction: number;
}

export const economicTypes = ['cost', 'upkeep', 'production'] as const;
export type EconomicType = typeof economicTypes[number];

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

      summary[resource][economicType][modifier.type] += modifier.value;

      return summary;
    }, {});
