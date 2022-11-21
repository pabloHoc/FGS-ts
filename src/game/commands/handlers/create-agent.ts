import { createAgent as createAgentEntity } from '../../entities/agent';
import { GameContext } from '../../core/game-context';
import { CreateAgent } from '../create-agent';

export const createAgent = (command: CreateAgent) => {
  const agent = createAgentEntity(
    command.name,
    command.empireId,
    command.regionId
  );
  GameContext.instance.addEntity(agent);
  return agent;
};
