import { Definition } from '.';
import { Conditions, validateConditions } from '../conditions/validator';
import { Empire } from '../entities/empire';
import { Land } from '../entities/land';
import { objectKeys } from '../helpers/object';
import { EconomyUnit } from './economy-unit';

interface IBuildingDefinition extends Definition {
  name: string;
  baseBuildtime: number;
  resources: EconomyUnit;
  conditions?: Conditions;
}

export class BuildingDefinition implements IBuildingDefinition {
  readonly type = 'BUILDING';
  readonly name: string;
  readonly baseBuildtime: number;
  readonly resources: EconomyUnit;
  readonly conditions?: Conditions;

  constructor(definition: IBuildingDefinition) {
    this.name = definition.name;
    this.baseBuildtime = definition.baseBuildtime;
    this.resources = {
      // TODO: check these assignments, they are not shallow
      category: definition.resources.category,
      cost: definition.resources.cost,
      upkeep: definition.resources.upkeep,
      production: definition.resources.production,
    };
    this.conditions = definition.conditions;
  }
  // TODO: should we expect an entity from the ui or an id?
  allow(empire: Empire, land: Land) {
    for (const resource of objectKeys(this.resources.cost)) {
      if (empire.resources[resource] < (this.resources.cost[resource] || 0)) {
        return false;
      }
    }

    if (this.conditions) {
      console.log('HERE');
      return validateConditions(this.conditions, land);
    }

    return true;
  }
}
