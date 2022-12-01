import { GlobalGameBlackboard } from '../../core/game-context';
import { Agent } from '../../entities/agent';
import { Army } from '../../entities/army';
import { SetLocation } from '../set-location';

// TODO: improve this!
export const setLocation = (command: SetLocation) => {
  const agent = GlobalGameBlackboard.instance.getEntity<Agent>(
    'AGENT',
    command.targetId
  );
  if (agent) {
    agent.regionId = command.locationId;
  }

  const army = GlobalGameBlackboard.instance.getEntity<Army>(
    'ARMY',
    command.targetId
  );

  if (army) {
    army.regionId = command.locationId;
  }
};
