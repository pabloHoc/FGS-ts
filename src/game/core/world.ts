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
import { CommandExecutor } from './command-executor';
import { GameContext } from './game-context';

export class World {
  // TODO: this should be a config
  private REGIONS_NUMBER = 10;
  private LANDS_PER_REGION = 5;

  private _commandExecutor: CommandExecutor;

  constructor(commandExecutor: CommandExecutor) {
    this._commandExecutor = commandExecutor;
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
    const empires = GameContext.instance.getAllEntities<Empire>('EMPIRE');

    for (let i = 1; i <= this.REGIONS_NUMBER; i++) {
      this._commandExecutor.execute(
        createRegion(`Region #${i}`, i === 1 ? empires[0].id : undefined)
      );
    }
  }

  private generateLands() {
    const regions = GameContext.instance.getAllEntities<Region>('REGION');

    for (const region of regions) {
      for (let i = 0; i < this.LANDS_PER_REGION; i++) {
        const landIndex = getRandom(
          0,
          DefinitionManager.instance.getAll<LandDefinition>('LAND').length - 1
        );
        const landName =
          DefinitionManager.instance.getAll<LandDefinition>('LAND')[landIndex]
            .name;
        this._commandExecutor.execute(createLand(landName, region.id));
      }
    }
  }

  private generateEmpires() {
    this._commandExecutor.execute(createEmpire('PLAYER EMPIRE', true));
  }

  private generateAgents() {
    const empires = GameContext.instance.getAllEntities<Empire>('EMPIRE');
    const regions = GameContext.instance.getAllEntities<Region>('REGION');

    for (const empire of empires) {
      const region = regions.find((region) => region.empireId === empire.id);

      if (region) {
        this._commandExecutor.execute(
          createAgent('Lorant', empire.id, region.id)
        );
      }
    }
  }
}
