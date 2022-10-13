import { ResourceProduction, ResourceType } from './resources';

const lands: LandData = {
  GRASSLAND: {
    production: [
      {
        resource: 'FOOD',
        base: 1,
      },
    ],
  },
  MOUNTAIN: {
    production: [
      {
        resource: 'IRON',
        base: 1,
      },
    ],
  },
  FOREST: {
    production: [
      {
        resource: 'WOOD',
        base: 1,
      },
    ],
  },
};

// TODO: research how to convert this file to a json
export type LandType = 'GRASSLAND' | 'FOREST' | 'MOUNTAIN';

export type LandData = Record<
  LandType,
  {
    production: ResourceProduction[];
  }
>;

type LandDataItem = {
  type: LandType;
  production: ResourceProduction[];
};

const landsArray = Object.keys(lands).reduce<LandDataItem[]>(
  (previousValue: any[], currentValue: string) => {
    return [
      ...previousValue,
      {
        type: currentValue,
        ...lands[currentValue as LandType],
      },
    ];
  },
  []
);

export const getLandsData = () => landsArray;

export const getLandData = (landType: LandType) => lands[landType];
