import { Definition } from '.';
import { ResourceBlock } from './economy-unit';

interface ILandDefinition extends Definition {
  name: string;
  resources: {
    production: ResourceBlock;
  };
}

export class LandDefinition implements ILandDefinition {
  readonly type = 'LAND';
  readonly name: string;
  readonly resources: {
    readonly production: ResourceBlock;
  };

  constructor(definition: ILandDefinition) {
    this.name = definition.name;
    this.resources = {
      // ! This is not a shallow assignment
      production: definition.resources.production,
    };
  }
}
