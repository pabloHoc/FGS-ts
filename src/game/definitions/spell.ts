import { Definition } from '.';
import { Conditions, validateConditions } from '../conditions/validator';
import { Actions, executeCommands } from '../commands/validator';
import { Agent } from '../entities/agent';
import { GameContext } from '../core/game-context';
import { CommandExecutor } from '../core/command-executor';
import { createSpell } from '../entities/spell';
import { getEmpireFromAgent } from '../scopes/agent';
import { AgentExecutableAction } from './agent-action';
import { ActionType } from '../entities/action-queue-item';

interface ISpellDefinition extends Definition, AgentExecutableAction {
  type: 'SPELL';
  duration: number;
}

export class SpellDefinition implements ISpellDefinition {
  readonly type = 'SPELL';
  readonly actionType = 'spell';
  readonly name: string;
  readonly baseExecutionTime: number;
  readonly duration: number;
  readonly mpCost?: number;
  readonly conditions?: Conditions | undefined;
  readonly actions: Actions;

  constructor(definition: ISpellDefinition) {
    this.name = definition.name;
    this.baseExecutionTime = definition.baseExecutionTime;
    this.duration = definition.duration;
    this.mpCost = definition.mpCost;
    this.conditions = definition.conditions;
    this.actions = definition.actions;
  }

  show() {
    return true;
  }

  // TODO: define target
  allow(agent: Agent) {
    return (
      (this.conditions ? validateConditions(this.conditions, agent) : true) &&
      (this.mpCost ? this.mpCost <= agent.mp : true)
    );
  }

  execute(caster: Agent) {
    // TODO: we need a target system here
    // TODO: does effects always apply to target?
    const spell = createSpell(
      this.name,
      getEmpireFromAgent(caster).id, // ! temporary
      this.duration
    );
    GameContext.instance.addEntity(spell);
    executeCommands(this.actions, caster, undefined, spell.id);
  }
}
