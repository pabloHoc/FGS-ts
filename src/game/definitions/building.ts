import { Definition } from '.';
import { Empire } from '../entities/empire';
import { objectKeys } from '../helpers/object';
import { EconomyUnit } from './economy-unit';

interface IBuildingDefinition extends Definition {
  name: string;
  baseBuildtime: number;
  resources: EconomyUnit;
}

export class BuildingDefinition implements IBuildingDefinition {
  readonly type = 'BUILDING';
  readonly name: string;
  readonly baseBuildtime: number;
  readonly resources: EconomyUnit;

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
