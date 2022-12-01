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
import { GlobalGameBlackboard } from './game-context';

export class World {
  // TODO: this should be a config
  private REGIONS_NUMBER = 10;
  private LANDS_PER_REGION = 5;

  // ? What's the difference between world and worldGenerator or worldMap?
  // TODO: This needs to be moved to a GENERATE_WORLD command

  generateWorld() {
    this.generateEmpires();
    this.generateRegions();
    this.generateLands();
    this.generateAgents();
  }

  private generateRegions() {
    const empires =
      GlobalGameBlackboard.instance.getAllEntities<Empire>('EMPIRE');

    for (let i = 1; i <= this.REGIONS_NUMBER; i++) {
      CommandExecutor.instance.execute(
        createRegion(
          `Region #${i}`,
          i === 1 ? empires[0].id : i === 2 ? empires[1].id : undefined
        )
      );
    }
  }

  private generateLands() {
    const regions =
      GlobalGameBlackboard.instance.getAllEntities<Region>('REGION');

    for (const region of regions) {
      for (let i = 0; i < this.LANDS_PER_REGION; i++) {
        const landIndex = getRandom(
          0,
          DefinitionManager.instance.getAll<LandDefinition>('LAND').length - 1
        );
        const landName =
          DefinitionManager.instance.getAll<LandDefinition>('LAND')[landIndex]
            .name;
        CommandExecutor.instance.execute(createLand(landName, region.id));
      }
    }
  }

  private generateEmpires() {
    CommandExecutor.instance.execute(createEmpire('PLAYER EMPIRE', true));
    CommandExecutor.instance.execute(createEmpire('AI PLAYER #1', false));
  }

  private generateAgents() {
    const empires =
      GlobalGameBlackboard.instance.getAllEntities<Empire>('EMPIRE');
    const regions =
      GlobalGameBlackboard.instance.getAllEntities<Region>('REGION');

    for (const empire of empires) {
      const region = regions.find((region) => region.empireId === empire.id);

      if (region) {
        CommandExecutor.instance.execute(
          createAgent('Lorant', empire.id, region.id)
        );
      }
    }
  }
}
