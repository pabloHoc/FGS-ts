import { GameContext } from '../../core/game-context';
import { Agent } from '../../entities/agent';
import { SetLocation } from '../set-location';

export const setLocation = (command: SetLocation, gameContext: GameContext) => {
  const agent = gameContext.getEntity<Agent>('AGENT', command.targetId);
  agent.regionId = command.locationId;
};
