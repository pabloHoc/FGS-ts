import { LandDefinition } from '../definitions/land';
import { EntityId } from '../entities';
import { createAgent } from '../entities/agent';
import { createEmpire, Empire } from '../entities/empire';
import { createLand } from '../entities/land';
import { createRegion, Region } from '../entities/region';
import { getRandom } from '../helpers/random';
import { DefinitionManager } from './definition-manager';
import { EntityManager } from './entity-manager';

export class World {
  // TODO: this should be a config
  private REGIONS_NUMBER = 10;
  private LANDS_PER_REGION = 5;

  private _entityManager: EntityManager;
  private _definitionManager: DefinitionManager;

  constructor(
    entityManager: EntityManager,
    definitionManager: DefinitionManager
  ) {
    this._entityManager = entityManager;
    this._definitionManager = definitionManager;
  }

  // ? What's the difference between world and worldGenerator or worldMap?
  // ! This needs to be moved to a system
  // ! Put this under effects (createAgentEffect)
  // ! Create a command line for effects

  generateWorld() {
    const playerEmpire = this.generateEmpires();

    for (let i = 1; i <= this.REGIONS_NUMBER; i++) {
      this.generateRegions(i, i === 1 ? playerEmpire.id : undefined);
    }

    this.generateAgents();
  }

  private generateRegions(number: number, empireId?: EntityId) {
    const region = createRegion(`Region #${number}`, empireId);
    this._entityManager.add(region);

    this.generateLandsForRegion(region.id);
  }

  private generateLandsForRegion(regionId: EntityId) {
    const lands = [];
    for (let i = 0; i < this.LANDS_PER_REGION; i++) {
      const landIndex = getRandom(
        0,
        this._definitionManager.getAll<LandDefinition>('land').length - 1
      );
      const landName =
        this._definitionManager.getAll<LandDefinition>('land')[landIndex].name;
      const land = createLand(landName, regionId);
      lands.push(land);
      this._entityManager.add(land);
    }
    return lands;
  }

  private generateEmpires() {
    const empire = createEmpire('PLAYER EMPIRE', true);
    this._entityManager.add(empire);
    return empire;
  }

  private generateAgents() {
    const empires = this._entityManager.getAll<Empire>('EMPIRE');
    const regions = this._entityManager.getAll<Region>('REGION');

    for (const empire of empires) {
      const region = regions.find((region) => region.empireId === empire.id);

      if (region) {
        const agent = createAgent('Lorant', empire.id, region.id);
        this._entityManager.add(agent);
      }
    }
  }
}
