import { Command } from '.';
import { Entity, EntityId } from '../entities';

export interface SetLocation extends Command {
  action: 'SET_LOCATION';
  targetId: EntityId;
  locationId: EntityId;
}

export const setLocation = (
  targetId: EntityId,
  locationId: EntityId
): SetLocation => ({
  action: 'SET_LOCATION',
  targetId,
  locationId,
});

export const setLocationWithScope = (scope: Entity, locationId: EntityId) => {
  return setLocation(scope.id, locationId);
};
