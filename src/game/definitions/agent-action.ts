import { Definition } from '.';
import { Command, Commands } from '../commands';
import { Action, CommandPayload, getCommand } from '../commands/command-map';
import { Conditions, validateConditions } from '../conditions/validator';
import { Dispatcher } from '../core/dispatcher';
import { GameContext } from '../core/game-context';
import { Agent } from '../entities/agent';

interface IAgentActionDefinition extends Definition {
  name: string;
  conditions: Conditions;
}

export class AgentActionDefinition implements IAgentActionDefinition {
  readonly type = 'AGENT-ACTION';
  readonly name: string;
  readonly conditions: Conditions;

  constructor(definition: IAgentActionDefinition) {
    this.name = definition.name;
    this.conditions = definition.conditions;
  }

  allow(agent: Agent, gameContext: GameContext) {
    return validateConditions(this.conditions, agent, gameContext);
  }

  // TODO: check cast here
  execute(agent: Agent, dispatcher: Dispatcher) {
    const payloadFromScopes: Partial<CommandPayload> = {};
    const command = getCommand(
      this.name as Action,
      payloadFromScopes
    ) as Commands;
    dispatcher.execute(command);
  }
}
