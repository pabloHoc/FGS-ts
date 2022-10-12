import { System } from '.';
import { EventManager } from '../../core/event-manager';
import { getBuildingsData } from '../../data/buildings';
import { getLandsData } from '../../data/lands';
import { EntityManager } from '../core/entity-manager';
import { Empire } from '../entities/empire';
import { Land } from '../entities/land';
import { Region } from '../entities/region';
import { Events } from '../events';

export class ResourceProducer implements System {
  private _eventManager: EventManager<Events>;
  private _entityManager: EntityManager;

  constructor(
    eventManager: EventManager<Events>,
    entityManager: EntityManager
  ) {
    this._eventManager = eventManager;
    this._entityManager = entityManager;
  }

  update() {
    for (const empire of this._entityManager.getAll<Empire>('EMPIRE')) {
      this.generateEmpireResources(empire);
    }
  }

  private generateEmpireResources(empire: Empire) {
    // * This can be cached
    const regions = this._entityManager.getAll<Region>('REGION');
    const ownedRegions = regions.filter(
      (region) => region.empireId === empire.id
    );

    for (const region of ownedRegions) {
      this.generateRegionResources(region, empire);
    }
  }

  /**
   * We need to check where to update resources, because we need to take
   * into account local and global bonuses, so probably this is not the best
   * architecture
   */
  private generateRegionResources(region: Region, empire: Empire) {
    // * This can be cached
    const lands = this._entityManager.getAll<Land>('LAND');
    const regionLands = lands.filter((land) => land.regionId === region.id);

    for (const land of regionLands) {
      this.generateLandResources(land, empire);
      this.generateBuildingResources(land, empire);
    }
  }

  private generateLandResources(land: Land, empire: Empire) {
    // * This can be cached
    const landsData = getLandsData();

    const landData = landsData.find(
      (landData) => landData.type === land.landType
    );

    if (!landData) throw Error('Land data not found');

    for (const production of landData.production) {
      const resource = empire.resources.find(
        (resource) => resource.type === production.resource
      );
      if (!resource) throw Error('Resource not found');

      resource.quantity += production.base;
    }
  }

  private generateBuildingResources(land: Land, empire: Empire) {
    const buildingsData = getBuildingsData();

    for (const building of land.buildings) {
      const buildingData = buildingsData.find(
        (buildingData) => buildingData.name === building
      );
      if (!buildingData) throw Error('Building data not found');

      for (const production of buildingData.production) {
        const resource = empire.resources.find(
          (resource) => resource.type === production.resource
        );

        if (!resource) throw Error('Resource not found');

        resource.quantity += production.base;
      }
    }
  }
}
