import { Command } from '.';
import { Agent, AgentId } from '../entities/agent';
import { Army, ArmyId } from '../entities/army';
import { RegionId } from '../entities/region';

export interface SetLocation extends Command {
  action: 'SET_LOCATION';
  targetId: AgentId | ArmyId;
  locationId: RegionId;
}

export const setLocation = (
  targetId: AgentId | ArmyId,
  locationId: RegionId
): SetLocation => ({
  action: 'SET_LOCATION',
  targetId,
  locationId,
});

export const setLocationWithScope = (
  scope: Agent | Army,
  locationId: RegionId
) => {
  return setLocation(scope.id, locationId);
};
