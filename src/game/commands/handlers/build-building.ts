import { DefinitionManager } from '../../core/definition-manager';
import { GameContext } from '../../core/game-context';
import { BuildingDefinition } from '../../definitions/building';
import { Empire } from '../../entities/empire';
import { Land } from '../../entities/land';
import { BuildBuilding } from '../build-building';

export const buildBuilding = (
  command: BuildBuilding,
  gameContext: GameContext,
  definitionManager: DefinitionManager
) => {
  const land = gameContext.getEntity<Land>('LAND', command.landId);
  const empire = gameContext.getEntity<Empire>('EMPIRE', command.empireId);

  const buildingDefinition = definitionManager.get<BuildingDefinition>(
    'building',
    command.buildingName
  );

  for (const [resource, cost = 0] of Object.entries(
    buildingDefinition.resources.cost
  )) {
    if (empire.resources[resource] < cost)
      throw new Error('Resources not enough');

    empire.resources[resource] -= cost;
  }

  land.buildings.push(command.buildingName);
};
