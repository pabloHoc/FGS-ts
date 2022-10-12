import { System } from '.';
import { EventManager } from '../../core/event-manager';
import { getBuildingsData } from '../../data/buildings';
import { EntityManager } from '../core/entity-manager';
import { Empire } from '../entities/empire';
import { Land } from '../entities/land';
import { Region } from '../entities/region';
import { Events } from '../events';
import { BuildBuilding } from '../events/build-building';
import { updateResources } from '../events/update-resources';

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
    const lands = this._entityManager.getAll<Land>('LAND');
    const land = lands.find((land) => land.id === event.landId);
    if (!land) throw Error('Land not found');

    const regions = this._entityManager.getAll<Region>('REGION');
    const region = regions.find((region) => region.id === land.regionId);
    if (!region) throw Error('Region not found');

    const empires = this._entityManager.getAll<Empire>('EMPIRE');
    const empire = empires.find((empire) => empire.id === region.empireId);
    if (!empire) throw Error('Empire not found');

    const buildingsData = getBuildingsData();
    const buildingData = buildingsData.find(
      (buildingData) => buildingData.name === event.buildingName
    );
    if (!buildingData) throw Error('Building not found');

    for (const cost of buildingData.cost) {
      const resource = empire.resources.find(
        (resource) => resource.type === cost.resource
      );
      if (!resource) throw new Error('Resource not found');

      if (resource.quantity < cost.base)
        throw new Error('Resources not enough');

      resource.quantity -= cost.base;
    }

    land.buildings.push(event.buildingName);
    this._eventManager.dispatch(updateResources());
  };
}
