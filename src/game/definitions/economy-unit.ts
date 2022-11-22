import resourceDefinitions from '../../data/resources/index';

export type ResourceType =
  typeof resourceDefinitions[keyof typeof resourceDefinitions]['name'];

// TODO: This could be: resource, stat, do we want them to be different?
export type EconomyUnit = {
  category: string;
  cost: ResourceBlock;
  upkeep: ResourceBlock;
  production: ResourceBlock;
};

export type ResourceBlock = { [K in ResourceType]: number };
