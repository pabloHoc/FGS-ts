import resourceDefinitions from '../../data/resources/index';

export type ResourceType =
  typeof resourceDefinitions[keyof typeof resourceDefinitions]['name'];

// This could be: resource, stat, do we want them to be different?
export type EconomyUnit = Partial<{ [K in ResourceType]: number }>;

export type EconomyBlock = { [K in ResourceType]: number };
