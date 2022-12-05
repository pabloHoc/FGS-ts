import { Command } from '.';
import { BaseEntityId, Entity } from '../entities';
import { AgentId } from '../entities/agent';
import { EmpireId } from '../entities/empire';
import { RegionId } from '../entities/region';

export interface SetOwner extends Command {
  action: 'SET_OWNER';
  targetId: RegionId | AgentId;
  ownerId: EmpireId;
}

export const setOwner = (
  targetId: RegionId | AgentId,
  ownerId: EmpireId
): SetOwner => ({
  action: 'SET_OWNER',
  targetId,
  ownerId,
});

// values is ScopeEntity, e.g.: ROOT
export const setOwnerWithScope = (scope: RegionId | AgentId, values: any) => {
  return setOwner(scope.id, values.empireId);
};
