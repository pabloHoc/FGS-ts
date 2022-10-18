import { DefinitionManager } from '../../core/definition-manager';
import { GameContext } from '../../core/game-context';
import { BuildingDefinition } from '../../definitions/building';
import { LandDefinition } from '../../definitions/land';
import { Empire } from '../../entities/empire';
import { Land } from '../../entities/land';
import { Region } from '../../entities/region';
import { getEmpireRegions } from '../../helpers/region';
import { ProduceResources } from '../produce-resources';

const generateEmpireResources = (
  empire: Empire,
  gameContext: GameContext,
  definitionManager: DefinitionManager
) => {
  // * This can be cached
  const empireRegions = getEmpireRegions(empire.id, gameContext);

  for (const region of empireRegions) {
    generateRegionResources(region, empire, gameContext, definitionManager);
  }
};

/**
 * We need to check where to update resources, because we need to take
 * into account local and global bonuses, so probably this is not the best
 * architecture
 */
const generateRegionResources = (
  region: Region,
  empire: Empire,
  gameContext: GameContext,
  definitionManager: DefinitionManager
) => {
  // * This can be cached
  const lands = gameContext.getAllEntities<Land>('LAND');
  const regionLands = lands.filter((land) => land.regionId === region.id);

  for (const land of regionLands) {
    generateLandResources(land, empire, gameContext, definitionManager);
    generateBuildingResources(land, empire, gameContext, definitionManager);
  }
};

const generateLandResources = (
  land: Land,
  empire: Empire,
  gameContext: GameContext,
  definitionManager: DefinitionManager
) => {
  // * This can be cached
  const landDefinition = definitionManager.get<LandDefinition>(
    'land',
    land.name
  );

  for (const [resource, quantity = 0] of Object.entries(
    landDefinition.resources.production
  )) {
    empire.resources = {
      ...empire.resources,
      [resource]: empire.resources[resource] + quantity,
    };
  }
};

const generateBuildingResources = (
  land: Land,
  empire: Empire,
  gameContext: GameContext,
  definitionManager: DefinitionManager
) => {
  for (const building of land.buildings) {
    const buildingDefinition = definitionManager.get<BuildingDefinition>(
      'building',
      building
    );

    for (const [resource, quantity = 0] of Object.entries(
      buildingDefinition.resources.production
    )) {
      empire.resources[resource] += quantity;
    }
  }
};

export const produceResources = (
  command: ProduceResources,
  gameContext: GameContext,
  definitionManager: DefinitionManager
) => {
  for (const empire of gameContext.getAllEntities<Empire>('EMPIRE')) {
    generateEmpireResources(empire, gameContext, definitionManager);
  }
};
