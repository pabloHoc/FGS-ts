import resourcesDefinitions from '../../data/resources/index';
import buildingsDefinitions from '../../data/buildings/index';
import landsDefinitions from '../../data/lands/index';
import agentActionsDefinitions from '../../data/agent-actions/index';
import { BuildingDefinition } from '../definitions/building';
import { ResourceDefinition } from '../definitions/resource';
import { objectKeys } from '../helpers/object';
import { LandDefinition } from '../definitions/land';
import { AgentActionDefinition } from '../definitions/agent-action';
import { TypeMapper } from '../helpers/types';

type Definition =
  | BuildingDefinition
  | ResourceDefinition
  | LandDefinition
  | AgentActionDefinition;

// We could merge these in one object maybe
const definitionsMap = {
  building: buildingsDefinitions,
  resource: resourcesDefinitions,
  land: landsDefinitions,
  'agent-action': agentActionsDefinitions,
};

const definitionsConstructors = {
  building: BuildingDefinition,
  resource: ResourceDefinition,
  land: LandDefinition,
  'agent-action': AgentActionDefinition,
};

type DefinitionType = keyof typeof definitionsMap;

export class DefinitionManager {
  private _definitions = {
    building: new Map<string, BuildingDefinition>(),
    resource: new Map<string, ResourceDefinition>(),
    land: new Map<string, LandDefinition>(),
    'agent-action': new Map<string, AgentActionDefinition>(),
  };

  constructor() {
    this.loadDefinitions();
  }

  private loadDefinitions() {
    for (const t in definitionsMap) {
      const type = t as DefinitionType;
      const definitions = definitionsMap[type];

      for (const n in definitions) {
        const name = n as keyof typeof definitions;
        this.getDefinitionsByType(
          type.toUpperCase() as Uppercase<DefinitionType>
        ).set(
          name,
          new definitionsConstructors[type](definitions[name]) as never
        );
      }
    }
  }

  private getDefinitionsByType<
    K extends keyof TypeMapper<DefinitionManager['_definitions']>
  >(type: Uppercase<K>) {
    return this._definitions[type.toLowerCase() as K];
  }

  get<T extends Definition>(type: T['type'], definitionName: T['name']): T {
    return this.getDefinitionsByType(type).get(definitionName) as T;
  }

  getAll<T extends Definition>(type: Definition['type']): T[] {
    return Array.from(this.getDefinitionsByType(type).values() as never) as T[];
  }
}
