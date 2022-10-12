import { GameEvent } from '../../core/event-manager';

// TODO: check if we need to differentiate expending vs obtaining resources
export interface UpdateResources extends GameEvent {
  type: 'UPDATE_RESOURCES';
}

export const updateResources = (): UpdateResources => ({
  type: 'UPDATE_RESOURCES',
});
