import { Command } from '.';

export interface ProduceResources extends Command {
  action: 'PRODUCE_RESOURCES';
}

export const produceResources = (): ProduceResources => ({
  action: 'PRODUCE_RESOURCES',
});
