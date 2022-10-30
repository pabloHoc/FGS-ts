import resourcesDefinitions from '../../data/resources/index';
import buildingsDefinitions from '../../data/buildings/index';
import landsDefinitions from '../../data/lands/index';
import agentActionsDefinitions from '../../data/agent-actions/index';
import { BuildingDefinition } from '../definitions/building';
import { ResourceDefinition } from '../definitions/resource';
import { objectKeys } from '../helpers/object';
import { LandDefinition } from '../definitions/land';
import { AgentActionDefinition } from '../definitions/agent-action';

type Definition =
  | BuildingDefinition
  | ResourceDefinition
  | LandDefinition
  | AgentActionDefinition;

export class DefinitionManager {
  buildings: Map<string, BuildingDefinition> = new Map();
  resources: Map<string, ResourceDefinition> = new Map();
  lands: Map<string, LandDefinition> = new Map();
  agentActions: Map<string, AgentActionDefinition> = new Map();

  constructor() {
    this.loadDefinitions();
  }

  private loadDefinitions() {
    this.loadBuildingsDefinitions();
    this.loadResourcesDefinitions();
    this.loadLandsDefinitions();
    this.loadAgentActionsDefinitions();
  }

  private loadBuildingsDefinitions() {
    for (const key of objectKeys(buildingsDefinitions)) {
      const definition = buildingsDefinitions[key];
      this.buildings.set(definition.name, new BuildingDefinition(definition));
    }
  }

  private loadResourcesDefinitions() {
    for (const key of objectKeys(resourcesDefinitions)) {
      const definition = resourcesDefinitions[key];
      this.resources.set(definition.name, new ResourceDefinition(definition));
    }
  }

  private loadLandsDefinitions() {
    for (const key of objectKeys(landsDefinitions)) {
      const definition = landsDefinitions[key];
      this.lands.set(definition.name, new LandDefinition(definition));
    }
  }

  private loadAgentActionsDefinitions() {
    for (const key of objectKeys(agentActionsDefinitions)) {
      const definition = agentActionsDefinitions[key];
      this.agentActions.set(
        definition.name,
        new AgentActionDefinition(definition)
      );
    }
  }

  get<T extends Definition>(type: T['type'], definitionName: T['name']): T {
    switch (type) {
      case 'building':
        return this.buildings.get(definitionName) as T;
      case 'land':
        return this.lands.get(definitionName) as T;
      case 'resource':
        return this.resources.get(definitionName) as T;
      case 'agent-action':
        return this.agentActions.get(definitionName) as T;
      default:
        throw Error('Definition not found');
    }
  }

  getAll<T extends Definition>(type: Definition['type']): T[] {
    switch (type) {
      case 'building':
        return Array.from(this.buildings.values()) as T[];
      case 'land':
        return Array.from(this.lands.values()) as T[];
      case 'resource':
        return Array.from(this.resources.values()) as T[];
      case 'agent-action':
        return Array.from(this.agentActions.values()) as T[];
      default:
        throw Error('Definition not found');
    }
  }
}
