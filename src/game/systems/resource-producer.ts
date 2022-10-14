import { System } from '.';
import { Dispatcher } from '../core/dispatcher';
import { DefinitionManager } from '../core/definition-manager';
import { EntityManager } from '../core/entity-manager';
import { BuildingDefinition } from '../definitions/building';
import { LandDefinition } from '../definitions/land';
import { Empire } from '../entities/empire';
import { Land } from '../entities/land';
import { Region } from '../entities/region';
import { Commands } from '../commands';
import { getEmpireRegions } from '../helpers/region';

export class ResourceProducer implements System {
  private _eventManager: Dispatcher<Commands>;
  private _entityManager: EntityManager;
  private _definitionManager: DefinitionManager;

  constructor(
    eventManager: Dispatcher<Commands>,
    entityManager: EntityManager,
    definitionManager: DefinitionManager
  ) {
    this._eventManager = eventManager;
    this._entityManager = entityManager;
    this._definitionManager = definitionManager;
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
    const landDefinition = this._definitionManager.get<LandDefinition>(
      'land',
      land.name
    );

    for (const [resource, quantity = 0] of Object.entries(
      landDefinition.resources.production
    )) {
      empire.resources[resource] += quantity;
    }
  }

  private generateBuildingResources(land: Land, empire: Empire) {
    for (const building of land.buildings) {
      const buildingDefinition =
        this._definitionManager.get<BuildingDefinition>('building', building);

      for (const [resource, quantity = 0] of Object.entries(
        buildingDefinition.resources.production
      )) {
        empire.resources[resource] += quantity;
      }
    }
  }
}
