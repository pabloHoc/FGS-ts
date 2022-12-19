import { GlobalGameBlackboard } from '../../core/game-context';
import { Agent } from '../../entities/agent';
import { SetAgentCurrentAction } from '../set-agent-current-action';

export const setAgentCurrentAction = (command: SetAgentCurrentAction) => {
  const agent = GlobalGameBlackboard.instance.getEntity<Agent>(
    'AGENT',
    command.agentId
  );
  agent.actions = [command.newCurrentAction];
};
