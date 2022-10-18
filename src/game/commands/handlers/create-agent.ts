import { createAgent as createAgentEntity } from '../../entities/agent';
import { GameContext } from '../../core/game-context';
import { CreateAgent } from '../create-agent';

export const createAgent = (command: CreateAgent, gameContext: GameContext) => {
  const agent = createAgentEntity(
    command.name,
    command.empireId,
    command.regionId
  );
  gameContext.addEntity(agent);
  return agent;
};
