import { Definition } from '.';
import { Actions, executeCommands } from '../commands/validator';
import { Conditions, validateConditions } from '../conditions/validator';
import { CommandExecutor } from '../core/command-executor';
import { GameContext } from '../core/game-context';
import { Agent } from '../entities/agent';

interface IAgentActionDefinition extends Definition {
  name: string;
  baseExecutionTime: number;
  conditions: Conditions;
  actions: Actions;
  showInUI?: boolean;
  mpCost?: number;
}

export class AgentActionDefinition implements IAgentActionDefinition {
  readonly type = 'AGENT-ACTION';
  readonly name: string;
  readonly conditions: Conditions;
  readonly actions: Actions;
  readonly baseExecutionTime: number;
  readonly showInUI?: boolean | undefined;
  readonly mpCost?: number;

  constructor(definition: IAgentActionDefinition) {
    this.name = definition.name;
    this.baseExecutionTime = definition.baseExecutionTime;
    this.conditions = definition.conditions;
    this.actions = definition.actions;
    this.showInUI = definition.showInUI;
    this.mpCost = definition.mpCost;
  }

  show() {
    return this.showInUI !== false;
  }

  allow(agent: Agent, gameContext: GameContext) {
    return (
      validateConditions(this.conditions, agent, gameContext) &&
      (this.mpCost ? this.mpCost <= agent.mp : true)
    );
  }

  // TODO: check cast here
  execute(
    agent: Agent,
    gameContext: GameContext,
    commandExecutor: CommandExecutor,
    payload?: object
  ) {
    executeCommands(
      this.actions,
      agent,
      { root: agent, this: agent, prev: undefined },
      gameContext,
      commandExecutor,
      payload
    );
  }
}
