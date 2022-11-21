import { GameContext } from '../../core/game-context';
import { Agent } from '../../entities/agent';
import { SetLocation } from '../set-location';

export const setLocation = (command: SetLocation) => {
  const agent = GameContext.instance.getEntity<Agent>(
    'AGENT',
    command.targetId
  );
  agent.regionId = command.locationId;
};
