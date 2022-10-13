import { System } from '.';
import { EventManager } from '../../core/event-manager';
import { getBuildingData } from '../../data/buildings';
import { getLandData } from '../../data/lands';
import { EntityManager } from '../core/entity-manager';
import { Empire } from '../entities/empire';
import { Land } from '../entities/land';
import { Region } from '../entities/region';
import { Events } from '../events';
import { getEmpireRegions, getEmpireResource } from '../helpers/empire';

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
    const empireRegions = getEmpireRegions(empire.id, this._entityManager);

    for (const region of empireRegions) {
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
    const landData = getLandData(land.landType);

    for (const production of landData.production) {
      const resource = getEmpireResource(empire, production.resource);
      resource.quantity += production.base;
    }
  }

  private generateBuildingResources(land: Land, empire: Empire) {
    for (const building of land.buildings) {
      const buildingData = getBuildingData(building);

      for (const production of buildingData.production) {
        const resource = getEmpireResource(empire, production.resource);
        resource.quantity += production.base;
      }
    }
  }
}
