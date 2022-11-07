import { Definition } from '.';
import { Actions, executeCommands } from '../commands/validator';
import { Conditions, validateConditions } from '../conditions/validator';
import { Dispatcher } from '../core/dispatcher';
import { GameContext } from '../core/game-context';
import { Agent } from '../entities/agent';

interface IAgentActionDefinition extends Definition {
  name: string;
  baseExecutionTime: number;
  conditions: Conditions;
  actions: Actions;
  showInUI?: boolean;
}

export class AgentActionDefinition implements IAgentActionDefinition {
  readonly type = 'AGENT-ACTION';
  readonly name: string;
  readonly conditions: Conditions;
  readonly actions: Actions;
  readonly baseExecutionTime: number;
  readonly showInUI?: boolean | undefined;

  constructor(definition: IAgentActionDefinition) {
    this.name = definition.name;
    this.baseExecutionTime = definition.baseExecutionTime;
    this.conditions = definition.conditions;
    this.actions = definition.actions;
    this.showInUI = definition.showInUI;
  }

  allow(agent: Agent, gameContext: GameContext) {
    return (
      this.showInUI !== false &&
      validateConditions(this.conditions, agent, gameContext)
    );
  }

  // TODO: check cast here
  execute(
    agent: Agent,
    gameContext: GameContext,
    dispatcher: Dispatcher,
    payload?: object
  ) {
    executeCommands(
      this.actions,
      agent,
      { root: agent, this: agent, prev: undefined },
      gameContext,
      dispatcher,
      payload
    );
  }
}
