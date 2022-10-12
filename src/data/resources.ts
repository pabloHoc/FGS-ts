const resources: ResourceData[] = [
  {
    type: 'WOOD',
  },
  {
    type: 'IRON',
  },
  {
    type: 'FOOD',
  },
];

export type ResourceType = 'WOOD' | 'IRON' | 'FOOD';

// TODO: research how to convert this file to a json
export interface ResourceData {
  type: ResourceType;
}

// * This should be more generic, is used both for cost, prod, and bonus
export interface ResourceProduction {
  resource: ResourceType;
  base: number;
}

export const getResourcesData = () => resources;
