import { ResourceProduction, ResourceType } from './resources';

const lands: LandData[] = [
  {
    type: 'GRASSLAND',
    production: [
      {
        resource: 'FOOD',
        base: 1,
      },
    ],
  },
  {
    type: 'MOUNTAIN',
    production: [
      {
        resource: 'IRON',
        base: 1,
      },
    ],
  },
  {
    type: 'FOREST',
    production: [
      {
        resource: 'WOOD',
        base: 1,
      },
    ],
  },
];

// TODO: research how to convert this file to a json
export type LandType = 'GRASSLAND' | 'FOREST' | 'MOUNTAIN';

export interface LandData {
  type: LandType;
  production: ResourceProduction[];
}

export const getLandsData = () => lands;
