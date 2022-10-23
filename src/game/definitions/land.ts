import { Definition } from '.';
import { EconomyUnit } from './economy-unit';

interface ILandDefinition extends Definition {
  name: string;
  resources: {
    production: EconomyUnit;
  };
}

export class LandDefinition implements ILandDefinition {
  readonly type = 'land';
  readonly name: string;
  readonly resources: {
    readonly production: EconomyUnit;
  };

  constructor(definition: ILandDefinition) {
    this.name = definition.name;
    this.resources = {
      // ! This is not a shallow assignment
      production: definition.resources.production,
    };
  }
}