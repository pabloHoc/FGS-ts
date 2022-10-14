import { Command } from '.';

// TODO: check if we need to differentiate expending vs obtaining resources
export interface UpdateResources extends Command {
  action: 'UPDATE_RESOURCES';
}

export const updateResources = (): UpdateResources => ({
  action: 'UPDATE_RESOURCES',
});
