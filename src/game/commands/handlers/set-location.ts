import { GlobalGameBlackboard } from '../../core/game-context';
import { Agent, AgentId } from '../../entities/agent';
import { Army, ArmyId } from '../../entities/army';
import { SetLocation } from '../set-location';

// TODO: improve this!
export const setLocation = (command: SetLocation) => {
  const agent = GlobalGameBlackboard.instance.getEntity<Agent>(
    'AGENT',
    command.targetId as AgentId
  );
  if (agent) {
    agent.regionId = command.locationId;
  }

  const army = GlobalGameBlackboard.instance.getEntity<Army>(
    'ARMY',
    command.targetId as ArmyId
  );

  if (army) {
    army.regionId = command.locationId;
  }
};
