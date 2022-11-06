import { Commands } from '../commands';
import { createAgent } from '../commands/create-agent';
import { createEmpire } from '../commands/create-empire';
import { createLand } from '../commands/create-land';
import { createRegion } from '../commands/create-region';
import { LandDefinition } from '../definitions/land';
import { EntityId } from '../entities';
import { Empire } from '../entities/empire';
import { Region } from '../entities/region';
import { getRandom } from '../helpers/random';
import { DefinitionManager } from './definition-manager';
import { Dispatcher } from './dispatcher';
import { GameContext } from './game-context';

export class World {
  // TODO: this should be a config
  private REGIONS_NUMBER = 10;
  private LANDS_PER_REGION = 5;

  private _gameContext: GameContext;
  private _definitionManager: DefinitionManager;
  private _dispatcher: Dispatcher;

  constructor(
    gameContext: GameContext,
    definitionManager: DefinitionManager,
    dispatcher: Dispatcher
  ) {
    this._gameContext = gameContext;
    this._definitionManager = definitionManager;
    this._dispatcher = dispatcher;
  }

  // ? What's the difference between world and worldGenerator or worldMap?
  // ! This needs to be moved to a GENERATE_WORLD command

  generateWorld() {
    this.generateEmpires();
    this.generateRegions();
    this.generateLands();
    this.generateAgents();
  }

  private generateRegions() {
    const empires = this._gameContext.getAllEntities<Empire>('EMPIRE');

    for (let i = 1; i <= this.REGIONS_NUMBER; i++) {
      this._dispatcher.execute(
        createRegion(`Region #${i}`, i === 1 ? empires[0].id : undefined)
      );
    }
  }

  private generateLands() {
    const regions = this._gameContext.getAllEntities<Region>('REGION');

    for (const region of regions) {
      for (let i = 0; i < this.LANDS_PER_REGION; i++) {
        const landIndex = getRandom(
          0,
          this._definitionManager.getAll<LandDefinition>('LAND').length - 1
        );
        const landName =
          this._definitionManager.getAll<LandDefinition>('LAND')[landIndex]
            .name;
        this._dispatcher.execute(createLand(landName, region.id));
      }
    }
  }

  private generateEmpires() {
    this._dispatcher.execute(createEmpire('PLAYER EMPIRE', true));
  }

  private generateAgents() {
    const empires = this._gameContext.getAllEntities<Empire>('EMPIRE');
    const regions = this._gameContext.getAllEntities<Region>('REGION');

    for (const empire of empires) {
      const region = regions.find((region) => region.empireId === empire.id);

      if (region) {
        this._dispatcher.execute(createAgent('Lorant', empire.id, region.id));
      }
    }
  }
}
