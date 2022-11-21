import { GameContext } from '../../core/game-context';
import { Land } from '../../entities/land';
import { BuildBuilding } from '../build-building';

export const buildBuilding = (command: BuildBuilding) => {
  const land = GameContext.instance.getEntity<Land>('LAND', command.landId);

  land.buildings.push(command.buildingName);
};
