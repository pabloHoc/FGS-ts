import { System } from '.';
import { EventManager } from '../../core/event-manager';
import { getBuildingData, getBuildingsData } from '../../data/buildings';
import { EntityManager } from '../core/entity-manager';
import { Empire } from '../entities/empire';
import { Land } from '../entities/land';
import { Region } from '../entities/region';
import { Events } from '../events';
import { BuildBuilding } from '../events/build-building';
import { updateResources } from '../events/update-resources';
import { getEmpireResource } from '../helpers/empire';

export class BuildingBuilder implements System {
  private _eventManager: EventManager<Events>;
  private _entityManager: EntityManager;

  constructor(
    eventManager: EventManager<Events>,
    entityManager: EntityManager
  ) {
    this._eventManager = eventManager;
    this._entityManager = entityManager;

    this._eventManager.listen('BUILD_BUILDING', this.handleBuildingBuilt);
  }

  update() {}

  handleBuildingBuilt = (event: BuildBuilding) => {
    const land = this._entityManager.get<Land>('LAND', event.landId);
    const empire = this._entityManager.get<Empire>('EMPIRE', event.empireId);

    const buildingData = getBuildingData(event.buildingName);

    for (const cost of buildingData.cost) {
      const resource = getEmpireResource(empire, cost.resource);
      if (!resource) throw new Error('Resource not found');

      if (resource.quantity < cost.base)
        throw new Error('Resources not enough');

      resource.quantity -= cost.base;
    }

    land.buildings.push(event.buildingName);
    this._eventManager.dispatch(updateResources());
  };
}
