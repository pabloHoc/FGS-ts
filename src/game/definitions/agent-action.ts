import { Definition } from '.';
import { Actions, executeCommands } from '../commands/validator';
import { Conditions, validateConditions } from '../conditions/validator';
import { ActionType } from '../entities/action-queue-item';
import { Agent } from '../entities/agent';

// ! Move this
export interface AgentExecutableAction {
  name: string;
  actionType: ActionType;
  baseExecutionTime: number;
  conditions?: Conditions;
  actions: Actions;
  mpCost?: number;
  execute(agent: Agent, payload?: object): void;
}

interface IAgentActionDefinition extends Definition, AgentExecutableAction {
  showInUI?: boolean;
}

export class AgentActionDefinition implements IAgentActionDefinition {
  readonly type = 'AGENT-ACTION';
  readonly actionType = 'action';
  readonly name: string;
  readonly conditions?: Conditions;
  readonly actions: Actions;
  readonly baseExecutionTime: number;
  readonly showInUI?: boolean;
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

  allow(agent: Agent) {
    return (
      (this.conditions ? validateConditions(this.conditions, agent) : true) &&
      (this.mpCost ? this.mpCost <= agent.mp : true)
    );
  }

  // TODO: check cast here
  execute(agent: Agent, payload?: object) {
    executeCommands(this.actions, agent, payload);
  }
}
