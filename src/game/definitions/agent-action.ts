import { Definition } from '.';
import { Conditions, validateConditions } from '../conditions/validator';
import { GameContext } from '../core/game-context';
import { Agent } from '../entities/agent';

interface IAgentActionDefinition extends Definition {
  name: string;
  conditions: Conditions;
}

export class AgentActionDefinition implements IAgentActionDefinition {
  readonly type = 'agent-action';
  readonly name: string;
  readonly conditions: Conditions;

  constructor(definition: IAgentActionDefinition) {
    this.name = definition.name;
    this.conditions = definition.conditions;
  }

  allow(agent: Agent, gameContext: GameContext) {
    return validateConditions(this.conditions, agent, gameContext);
  }

  execute(agent: Agent) {}
}
