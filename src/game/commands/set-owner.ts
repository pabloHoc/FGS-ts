import { Command } from '.';
import { Entity, EntityId } from '../entities';

export interface SetOwner extends Command {
  action: 'SET_OWNER';
  targetId: EntityId;
  ownerId: EntityId;
}

export const setOwner = (targetId: EntityId, ownerId: EntityId): SetOwner => ({
  action: 'SET_OWNER',
  targetId,
  ownerId,
});

// values is ScopeEntity, e.g.: ROOT
export const setOwnerWithScope = (scope: Entity, values: any) => {
  return setOwner(scope.id, values.empireId);
};
