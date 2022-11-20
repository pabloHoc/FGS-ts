import { Definition } from '.';
import { EconomicType } from '../helpers/modifiers';
import { Modifier } from './modifier';

interface IEconomicCategoryDefinition extends Definition {
  name: string;
  parent?: string;
  compute: (
    economicType: EconomicType,
    initialValue: number,
    resource?: string,
    regionModifiers?: Modifier[],
    empireModifiers?: []
  ) => number;
}

export class EconomicCategoryDefinition implements IEconomicCategoryDefinition {
  readonly type = 'ECONOMIC-CATEGORY';
  readonly name: string;
  readonly parent?: string;

  constructor(definition: IEconomicCategoryDefinition) {
    this.name = definition.name;
    this.parent = definition.parent;
  }

  compute(
    economicType: EconomicType,
    initialValue: number,
    resource?: string,
    regionModifiers?: Modifier[],
    empireModifiers?: Modifier[]
  ): number {
    const modifierNames = [
      ...(resource
        ? [
            `${this.name}_${resource}_${economicType}`,
            `${resource}_${economicType}`,
          ]
        : []),
      `${this.name}_${economicType}`,
      economicType,
    ];

    const modifiers = [
      ...(regionModifiers?.filter((m) => modifierNames.includes(m.name)) || []),
      ...(empireModifiers?.filter((m) => modifierNames.includes(m.name)) || []),
    ];

    const totals = modifiers.reduce(
      (acc, modifier) => {
        acc[modifier.type] += modifier.value;
        return acc;
      },
      {
        add: 0,
        mult: 0,
        reduction: 0,
      }
    );

    return (
      (initialValue + totals.add) * (1 + totals.mult) * (1 - totals.reduction)
    );
  }
}
