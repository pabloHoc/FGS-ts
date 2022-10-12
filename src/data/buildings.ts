import { ResourceProduction } from './resources';

const buildings: BuildingData[] = [
  {
    name: 'MILL',
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
  {
    name: 'MINE',
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
  {
    name: 'FARM',
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
];

export type BuildingType = 'MILL' | 'MINE' | 'FARM';

export interface BuildingData {
  name: BuildingType;
  production: ResourceProduction[];
  cost: ResourceProduction[];
}

export const getBuildingsData = () => buildings;
