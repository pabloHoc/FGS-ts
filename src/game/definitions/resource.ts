import { Definition } from '.';

interface IResourceDefinition extends Definition {
  name: string;
}

// Economy Unit???
export class ResourceDefinition implements IResourceDefinition {
  readonly type = 'RESOURCE';
  readonly name: string;

  constructor(definition: IResourceDefinition) {
    this.name = definition.name;
  }
}
