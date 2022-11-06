import { Definition } from '.';
import { Actions, executeCommands } from '../commands/validator';
import { Conditions, validateConditions } from '../conditions/validator';
import { Dispatcher } from '../core/dispatcher';
import { GameContext } from '../core/game-context';
import { Agent } from '../entities/agent';

interface IAgentActionDefinition extends Definition {
  name: string;
  conditions: Conditions;
  actions: Actions;
}

export class AgentActionDefinition implements IAgentActionDefinition {
  readonly type = 'AGENT-ACTION';
  readonly name: string;
  readonly conditions: Conditions;
  readonly actions: Actions;

  constructor(definition: IAgentActionDefinition) {
    this.name = definition.name;
    this.conditions = definition.conditions;
    this.actions = definition.actions;
  }

  allow(agent: Agent, gameContext: GameContext) {
    return validateConditions(this.conditions, agent, gameContext);
  }

  // TODO: check cast here
  execute(agent: Agent, gameContext: GameContext, dispatcher: Dispatcher) {
    executeCommands(
      this.actions,
      agent,
      { root: agent, this: agent, prev: undefined },
      gameContext,
      dispatcher
    );
  }
}
