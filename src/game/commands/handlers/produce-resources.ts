import { DefinitionManager } from '../../core/definition-manager';
import { GlobalGameBlackboard } from '../../core/game-context';
import { BuildingDefinition } from '../../definitions/building';
import { EconomicCategoryDefinition } from '../../definitions/economic-category';
import { LandDefinition } from '../../definitions/land';
import { Empire } from '../../entities/empire';
import { Land } from '../../entities/land';
import { Region } from '../../entities/region';
import { getModifiersForEntity } from '../../helpers/modifier';
import { getEmpireRegions } from '../../helpers/region';
import { ProduceResources } from '../produce-resources';

const computeEmpireProduction = (empire: Empire) => {
  // This can be cached
  const empireRegions = getEmpireRegions(empire.id);

  for (const region of empireRegions) {
    computeRegionProduction(region, empire);
  }
};

/**
 * We need to check where to update resources, because we need to take
 * into account local and global bonuses, so probably this is not the best
 * architecture
 */
const computeRegionProduction = (region: Region, empire: Empire) => {
  // This can be cached
  const lands = GlobalGameBlackboard.instance.getAllEntities<Land>('LAND');
  const regionLands = lands.filter((land) => land.regionId === region.id);

  for (const land of regionLands) {
    computeLandProduction(land, empire);
    for (const building of land.buildings) {
      computeBuildingProdution(building, region, empire);
    }
  }
};

const computeLandProduction = (land: Land, empire: Empire) => {
  // This can be cached
  const landDefinition = DefinitionManager.instance.get<LandDefinition>(
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
  empire: Empire
) => {
  const buildingDefinition = DefinitionManager.instance.get<BuildingDefinition>(
    'BUILDING',
    building
  );

  const economicCategoryDefinition =
    DefinitionManager.instance.get<EconomicCategoryDefinition>(
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
      getModifiersForEntity(region.id),
      getModifiersForEntity(empire.id)
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

export const produceResources = (command: ProduceResources) => {
  for (const empire of GlobalGameBlackboard.instance.getAllEntities<Empire>(
    'EMPIRE'
  )) {
    // TODO: Production shoul be calculated in a different command
    // so we can determine production the first turn without
    // producing resources
    clearEmpireProduction(empire);
    computeEmpireProduction(empire);
    produceEmpireResources(empire);
  }
};
