import { System } from '.';
import { EventManager } from '../../core/event-manager';
import { EntityManager } from '../core/entity-manager';
import { Empire } from '../entities/empire';
import { Land } from '../entities/land';
import { Events } from '../events';
import { BuildBuilding } from '../events/build-building';
import { updateResources } from '../events/update-resources';
import { DefinitionManager } from '../core/definition-manager';
import { BuildingDefinition } from '../definitions/building';

export class BuildingBuilder implements System {
  private _eventManager: EventManager<Events>;
  private _entityManager: EntityManager;
  private _definitionManager: DefinitionManager;

  constructor(
    eventManager: EventManager<Events>,
    entityManager: EntityManager,
    definitionManager: DefinitionManager
  ) {
    this._eventManager = eventManager;
    this._entityManager = entityManager;
    this._definitionManager = definitionManager;

    this._eventManager.listen('BUILD_BUILDING', this.handleBuildingBuilt);
  }

  update() {}

  handleBuildingBuilt = (event: BuildBuilding) => {
    const land = this._entityManager.get<Land>('LAND', event.landId);
    const empire = this._entityManager.get<Empire>('EMPIRE', event.empireId);

    const buildingDefinition = this._definitionManager.get<BuildingDefinition>(
      'building',
      event.buildingName
    );

    for (const [resource, cost = 0] of Object.entries(
      buildingDefinition.resources.cost
    )) {
      if (empire.resources[resource] < cost)
        throw new Error('Resources not enough');

      empire.resources[resource] -= cost;
    }

    land.buildings.push(event.buildingName);
    this._eventManager.dispatch(updateResources());
  };
}
