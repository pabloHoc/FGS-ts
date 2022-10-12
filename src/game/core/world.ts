import { getLandsData } from '../../data/lands';
import { EntityId } from '../entities';
import { createEmpire } from '../entities/empire';
import { createLand, Land } from '../entities/land';
import { createRegion, Region } from '../entities/region';
import { getRandom } from '../helpers/random';
import { EntityManager } from './entity-manager';

export class World {
  // TODO: this should be a config
  private REGIONS_NUMBER = 10;
  private LANDS_PER_REGION = 5;

  private _entityManager: EntityManager;

  constructor(entityManager: EntityManager) {
    this._entityManager = entityManager;
  }

  // ? What's the difference between world and worldGenerator or worldMap?

  generateWorld() {
    for (let i = 1; i <= this.REGIONS_NUMBER; i++) {
      this.generateRegions(i);
    }
    this.generateEmpires();
  }

  private generateRegions(number: number) {
    const region = createRegion(`Region #${number}`);
    this._entityManager.add(region);

    const lands = this.generateLandsForRegion(region.id);
    const landsIds = lands.map((land) => land.id);
  }

  private generateLandsForRegion(regionId: EntityId) {
    const lands = [];
    for (let i = 0; i < this.LANDS_PER_REGION; i++) {
      const landIndex = getRandom(0, getLandsData().length - 1);
      const landType = getLandsData()[landIndex].type;
      const land = createLand(landType, regionId);
      lands.push(land);
      this._entityManager.add(land);
    }
    return lands;
  }

  private generateEmpires() {
    const empire = createEmpire('PLAYER EMPIRE', true);
    this._entityManager.add(empire);

    this._entityManager.getAll<Region>('REGION')[0].empireId = empire.id;
  }
}
