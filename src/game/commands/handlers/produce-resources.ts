import { DefinitionManager } from '../../core/definition-manager';
import { GameContext } from '../../core/game-context';
import { BuildingDefinition } from '../../definitions/building';
import { EconomicCategoryDefinition } from '../../definitions/economic-category';
import { LandDefinition } from '../../definitions/land';
import { Empire } from '../../entities/empire';
import { Land } from '../../entities/land';
import { Region } from '../../entities/region';
import { getEmpireRegions } from '../../helpers/region';
import { ProduceResources } from '../produce-resources';

const computeEmpireModifiers = (empire: Empire) => {
  for (const modifier of empire.modifiers) {
    // isProductionModifier
    // this is wrong, we should check economic categories
    if (modifier.name.includes('production')) {
      const resource = modifier.name.split('_').slice(-2, -1)[0];
      empire.production[resource] *= modifier.value;
    }
  }
};

const computeEmpireProduction = (
  empire: Empire,
  gameContext: GameContext,
  definitionManager: DefinitionManager
) => {
  // * This can be cached
  const empireRegions = getEmpireRegions(empire.id, gameContext);

  for (const region of empireRegions) {
    computeRegionProduction(region, empire, gameContext, definitionManager);
  }

  // computeEmpireModifiers(empire);
};

/**
 * We need to check where to update resources, because we need to take
 * into account local and global bonuses, so probably this is not the best
 * architecture
 */
const computeRegionProduction = (
  region: Region,
  empire: Empire,
  gameContext: GameContext,
  definitionManager: DefinitionManager
) => {
  // * This can be cached
  const lands = gameContext.getAllEntities<Land>('LAND');
  const regionLands = lands.filter((land) => land.regionId === region.id);

  for (const land of regionLands) {
    computeLandProduction(land, empire, gameContext, definitionManager);
    for (const building of land.buildings) {
      computeBuildingProdution(
        building,
        region,
        empire,
        gameContext,
        definitionManager
      );
    }
  }
};

const computeLandProduction = (
  land: Land,
  empire: Empire,
  gameContext: GameContext,
  definitionManager: DefinitionManager
) => {
  // * This can be cached
  const landDefinition = definitionManager.get<LandDefinition>(
    'LAND',
    land.name
  );

  for (const [resource, quantity = 0] of Object.entries(
    landDefinition.resources.production
  )) {
    empire.production = {
      ...empire.production,
      [resource]: empire.production[resource] + quantity,
    };
  }
};

const computeBuildingProdution = (
  building: string,
  region: Region,
  empire: Empire,
  gameContext: GameContext,
  definitionManager: DefinitionManager
) => {
  const buildingDefinition = definitionManager.get<BuildingDefinition>(
    'BUILDING',
    building
  );

  const economicCategoryDefinition =
    definitionManager.get<EconomicCategoryDefinition>(
      'ECONOMIC-CATEGORY',
      buildingDefinition.resources.category
    );

  for (const [resource, productionValue = 0] of Object.entries(
    buildingDefinition.resources.production
  )) {
    const totalBuildingProduction = economicCategoryDefinition.compute(
      'production',
      productionValue,
      resource,
      region.modifiers,
      empire.modifiers
    );
    empire.production[resource] += totalBuildingProduction;
  }
};

const clearEmpireProduction = (empire: Empire) => {
  for (const [resource] of Object.entries(empire.production)) {
    empire.production[resource] = 0;
  }
};

const produceEmpireResources = (empire: Empire) => {
  for (const [resource, quantity] of Object.entries(empire.production)) {
    empire.resources[resource] += quantity;
  }
};

export const produceResources = (
  command: ProduceResources,
  gameContext: GameContext,
  definitionManager: DefinitionManager
) => {
  for (const empire of gameContext.getAllEntities<Empire>('EMPIRE')) {
    // Production shoul be calculated in a different command
    // so we can determine production the first turn without
    // producing resources
    clearEmpireProduction(empire);
    computeEmpireProduction(empire, gameContext, definitionManager);
    produceEmpireResources(empire);
  }
};
