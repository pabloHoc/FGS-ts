import { ResourceProduction } from './resources';

const buildings: BuildingData = {
  MILL: {
    production: [
      {
        resource: 'WOOD',
        base: 1,
      },
    ],
    cost: [
      {
        resource: 'WOOD',
        base: 5,
      },
    ],
  },
  MINE: {
    production: [
      {
        resource: 'IRON',
        base: 1,
      },
    ],
    cost: [
      {
        resource: 'IRON',
        base: 5,
      },
    ],
  },
  FARM: {
    production: [
      {
        resource: 'FOOD',
        base: 1,
      },
    ],
    cost: [
      {
        resource: 'FOOD',
        base: 5,
      },
    ],
  },
};

export type BuildingType = 'MILL' | 'MINE' | 'FARM';

export type BuildingData = Record<
  BuildingType,
  {
    production: ResourceProduction[];
    cost: ResourceProduction[];
  }
>;

type BuildingDataItem = {
  name: BuildingType;
  production: ResourceProduction[];
  cost: ResourceProduction[];
};

const buildingsArray = Object.keys(buildings).reduce<BuildingDataItem[]>(
  (previousValue: any[], currentValue: string) => {
    return [
      ...previousValue,
      {
        name: currentValue,
        ...buildings[currentValue as BuildingType],
      },
    ];
  },
  []
);

export const getBuildingsData = () => buildingsArray;

export const getBuildingData = (buildingName: BuildingType) =>
  buildings[buildingName];
