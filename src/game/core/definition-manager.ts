import resourcesDefinitions from '../../data/resources';
import buildingsDefinitions from '../../data/buildings';
import landsDefinitions from '../../data/lands';
import agentActionsDefinitions from '../../data/agent-actions';
import economicCategoriesDefinitions from '../../data/economic-categories';
import spellsDefinitions from '../../data/spells';
import { BuildingDefinition } from '../definitions/building';
import { ResourceDefinition } from '../definitions/resource';
import { LandDefinition } from '../definitions/land';
import { AgentActionDefinition } from '../definitions/agent-action';
import { EconomicCategoryDefinition } from '../definitions/economic-category';
import { TypeMapper } from '../helpers/types';
import { SpellDefinition } from '../definitions/spell';
import { Definition } from '../definitions';

type Definitions =
  | BuildingDefinition
  | ResourceDefinition
  | LandDefinition
  | AgentActionDefinition
  | EconomicCategoryDefinition
  | SpellDefinition;

// We could merge these in one object maybe
// ! any here
type DefinitionMap = {
  [k in Lowercase<Definitions['type']>]: Record<string, any>;
};

const definitionsMap: DefinitionMap = {
  building: buildingsDefinitions,
  resource: resourcesDefinitions,
  land: landsDefinitions,
  'agent-action': agentActionsDefinitions,
  'economic-category': economicCategoriesDefinitions,
  spell: spellsDefinitions,
};

const definitionsConstructors = {
  building: BuildingDefinition,
  resource: ResourceDefinition,
  land: LandDefinition,
  'agent-action': AgentActionDefinition,
  'economic-category': EconomicCategoryDefinition,
  spell: SpellDefinition,
};

type DefinitionType = keyof typeof definitionsMap;

export class DefinitionManager {
  private static _instance: DefinitionManager;

  private _definitions = {
    building: new Map<string, BuildingDefinition>(),
    resource: new Map<string, ResourceDefinition>(),
    land: new Map<string, LandDefinition>(),
    'agent-action': new Map<string, AgentActionDefinition>(),
    'economic-category': new Map<string, EconomicCategoryDefinition>(),
    spell: new Map<string, SpellDefinition>(),
  };

  constructor() {
    this.loadDefinitions();
  }

  static get instance() {
    if (!this._instance) {
      this._instance = new DefinitionManager();
    }
    return this._instance;
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

  get<T extends Definitions>(type: T['type'], definitionName: T['name']): T {
    return this.getDefinitionsByType(type).get(definitionName) as T;
  }

  getAll<T extends Definitions>(type: T['type']): T[] {
    return Array.from(this.getDefinitionsByType(type).values() as never) as T[];
  }
}
