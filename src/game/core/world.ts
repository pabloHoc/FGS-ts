import { createAgent } from '../commands/create-agent';
import { createEmpire } from '../commands/create-empire';
import { createLand } from '../commands/create-land';
import { createRegion } from '../commands/create-region';
import { LandDefinition } from '../definitions/land';
import { Empire } from '../entities/empire';
import { Region } from '../entities/region';
import { getRandom } from '../helpers/random';
import { DefinitionManager } from './definition-manager';
import { CommandExecutor } from './command-executor';
import { GlobalGameBlackboard } from './game-context';
import { objectKeys } from '../helpers/object';

const isFarFromBorder = (
  x: number,
  y: number,
  i: number,
  j: number,
  CHUNK_SIZE: number,
  GAP: number,
  REGION_SIZE: number
) => {
  return (
    x > i * CHUNK_SIZE + GAP &&
    x + REGION_SIZE < (i + 1) * CHUNK_SIZE - GAP &&
    y > j * CHUNK_SIZE + GAP &&
    y + REGION_SIZE < (j + 1) * CHUNK_SIZE - GAP
  );
};

const isOverlapping = (
  x: number,
  y: number,
  regions: { x: number; y: number }[]
) => {
  const REGION_SIZE = 30;
  const DISTANCE = 40;

  for (const region of regions) {
    const rect1 = {
      left: x,
      right: x + REGION_SIZE,
      top: y,
      bottom: y + REGION_SIZE,
    };

    const rect2 = {
      left: region.x - DISTANCE,
      right: region.x + REGION_SIZE + DISTANCE,
      top: region.y - DISTANCE,
      bottom: region.y + REGION_SIZE + DISTANCE,
    };

    const overlap = !(
      rect1.right < rect2.left ||
      rect1.left > rect2.right ||
      rect1.bottom < rect2.top ||
      rect1.top > rect2.bottom
    );

    if (overlap) {
      return true;
    }
  }
  return false;
};

type Locations = Record<number, Region>;

export class World {
  // TODO: this should be a config
  private REGIONS_NUMBER = 10;
  private LANDS_PER_REGION = 5;
  private COLUMNS = 10;
  private ROWS = 8;
  private CHUNK_SIZE = window.innerHeight / this.ROWS;
  private GAP = 10;
  private REGION_SIZE = 30;

  private locations: Locations = {};

  // ? What's the difference between world and worldGenerator or worldMap?
  // TODO: This needs to be moved to a GENERATE_WORLD command

  generateWorld() {
    this.generateEmpires();
    this.generateRegions();
    this.generateRoads();
    this.generateLands();
    this.generateAgents();
  }

  /**
   * TODO: fix world generation, this is a mess
   */

  private generateRegions() {
    const empires =
      GlobalGameBlackboard.instance.getAllEntities<Empire>('EMPIRE');

    let regionNumber = 0;

    for (let j = 0; j < this.ROWS; j++) {
      for (let i = 0; i < this.COLUMNS; i++) {
        const nOfRegions = getRandom(0, 1);

        for (let k = 0; k < nOfRegions; k++) {
          const empireId =
            regionNumber === 1
              ? empires[0].id
              : regionNumber === 2
              ? empires[1].id
              : undefined;

          let canPlace = false;

          while (!canPlace) {
            const x = getRandom(i * this.CHUNK_SIZE, (i + 1) * this.CHUNK_SIZE);
            const y = getRandom(j * this.CHUNK_SIZE, (j + 1) * this.CHUNK_SIZE);

            if (
              isFarFromBorder(
                x,
                y,
                i,
                j,
                this.CHUNK_SIZE,
                this.GAP,
                this.REGION_SIZE
              )
            ) {
              const region = CommandExecutor.instance.execute(
                createRegion(`Region #${regionNumber}`, x, y, empireId)
              ) as unknown as Region;
              regionNumber++;

              this.locations[i + j * this.COLUMNS] = region;

              canPlace = true;
            }
          }
        }
      }
    }
  }

  private generateRoads() {
    const chunkIndexes = objectKeys(this.locations);

    // Horizontal roads
    for (let i = 0; i < chunkIndexes.length; i++) {
      if (i < chunkIndexes.length - 1) {
        const chunkIndex = chunkIndexes[i];
        const nextChunkIndex = chunkIndexes[i + 1];

        // if they are in the same row
        if (
          Math.floor(chunkIndex / this.COLUMNS) ===
            Math.floor(nextChunkIndex / this.COLUMNS) &&
          nextChunkIndex - chunkIndex < 3 // and they aren't too far away
        ) {
          const region = this.locations[chunkIndex];
          const nextRegion = this.locations[nextChunkIndex];
          region.connectedTo.push(nextRegion.id);
        }
      }
    }

    // Vertical roads
    for (let i = 0; i < chunkIndexes.length; i++) {
      const chunk = Number(chunkIndexes[i]);
      const bottomChunk = chunk + this.COLUMNS;
      const bottomLeftChunk = chunk + this.COLUMNS - 1;
      const bottomRightChunk = chunk + this.COLUMNS + 1;
      const twoRowsBottomChunk = chunk + this.COLUMNS * 2;
      const twoRowsBottomLeftChunk = chunk + this.COLUMNS * 2 - 1;
      const twoRowsBottomRightChunk = chunk + this.COLUMNS * 2 + 1;

      const region = this.locations[chunk];
      const isLeftBorder = chunk % this.COLUMNS === 0;
      const isRightBorder = (chunk + 1) % this.COLUMNS === 0;
      // Try to connect bottom first
      if (this.locations[bottomChunk]) {
        region.connectedTo.push(this.locations[bottomChunk].id);
      } else if (
        !isRightBorder &&
        !isLeftBorder &&
        (this.locations[bottomLeftChunk] || this.locations[bottomRightChunk])
      ) {
        // If not, try to connect both diagonals firts if not in border
        if (this.locations[bottomLeftChunk]) {
          region.connectedTo.push(this.locations[bottomLeftChunk].id);
        }
        if (this.locations[bottomRightChunk]) {
          region.connectedTo.push(this.locations[bottomRightChunk].id);
        }
      } else if (
        // if left border, connect right diagonal only
        isLeftBorder &&
        !isRightBorder &&
        this.locations[bottomRightChunk]
      ) {
        region.connectedTo.push(this.locations[bottomRightChunk].id);
      } else if (
        // if right border, connect left diagonal only
        isRightBorder &&
        !isLeftBorder &&
        this.locations[bottomLeftChunk]
      ) {
        region.connectedTo.push(this.locations[bottomLeftChunk].id);
      } else if (this.locations[twoRowsBottomChunk]) {
        // Do the same, but 2 rows belows
        region.connectedTo.push(this.locations[twoRowsBottomChunk].id);
      } else if (!isRightBorder && !isLeftBorder) {
        if (this.locations[twoRowsBottomLeftChunk]) {
          region.connectedTo.push(this.locations[twoRowsBottomLeftChunk].id);
        }
        if (this.locations[twoRowsBottomRightChunk]) {
          region.connectedTo.push(this.locations[twoRowsBottomRightChunk].id);
        }
      } else if (
        isLeftBorder &&
        !isRightBorder &&
        this.locations[twoRowsBottomRightChunk]
      ) {
        region.connectedTo.push(this.locations[twoRowsBottomRightChunk].id);
      } else if (
        isRightBorder &&
        !isLeftBorder &&
        this.locations[twoRowsBottomLeftChunk]
      ) {
        region.connectedTo.push(this.locations[twoRowsBottomLeftChunk].id);
      }
    }

    // Connect roads in the opposite direction
    // TODO: this sucks
    const regions =
      GlobalGameBlackboard.instance.getAllEntities<Region>('REGION');
    for (const region of regions) {
      for (const regionId of region.connectedTo) {
        const connectedRegion = GlobalGameBlackboard.instance.getEntity<Region>(
          'REGION',
          regionId
        );
        if (!connectedRegion.connectedTo.includes(region.id)) {
          connectedRegion.connectedTo.push(region.id);
        }
      }
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
