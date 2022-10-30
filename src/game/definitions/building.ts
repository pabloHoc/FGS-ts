import { Definition } from '.';
import { Empire } from '../entities/empire';
import { objectKeys } from '../helpers/object';
import { EconomyUnit } from './economy-unit';

// TODO: change name
interface IBuildingDefinition extends Definition {
  name: string;
  baseBuildtime: number;
  resources: {
    cost: EconomyUnit;
    production: EconomyUnit;
  };
}

export class BuildingDefinition implements IBuildingDefinition {
  readonly type = 'building';
  readonly name: string;
  readonly baseBuildtime: number;
  readonly resources: {
    readonly cost: EconomyUnit;
    readonly production: EconomyUnit;
  };

  constructor(definition: IBuildingDefinition) {
    this.name = definition.name;
    this.baseBuildtime = definition.baseBuildtime;
    this.resources = {
      // ! These are not a shallow assignments
      cost: definition.resources.cost,
      production: definition.resources.production,
    };
  }

  allow(empire: Empire) {
    for (const resource of objectKeys(this.resources.cost)) {
      if (empire.resources[resource] < (this.resources.cost[resource] || 0)) {
        return false;
      }
    }
    return true;
  }
}
