import { Definition } from '.';
import { Conditions, validateConditions } from '../conditions/validator';
import { DefinitionManager } from '../core/definition-manager';
import { GameBlackboard } from '../core/game-blackboard';
import { Entity } from '../entities';
import { getScopeFrom, ScopeType } from '../scopes';
import { Blackboard } from '../utility-ai/blackboard';
import { ScorerDefinition } from './scorer';

type TaskType = 'highest-score';

interface BaseTaskDefinition extends Definition {
  type: 'TASK';
  name: string;
  conditions?: Conditions;
  scorers?: string[];
  weight?: number;
  target: ScopeType;
}

interface ComplexTaskDefinition extends BaseTaskDefinition {
  taskType: TaskType;
  subtasks: string[];
  isRoot?: boolean;
}

interface PrimitiveTaskDefinition extends BaseTaskDefinition {}

type ITaskDefinition = BaseTaskDefinition &
  Partial<ComplexTaskDefinition & PrimitiveTaskDefinition>;

export class TaskDefinition implements BaseTaskDefinition {
  readonly type = 'TASK';
  readonly name: string;
  readonly taskType?: TaskType;
  readonly subtasks?: string[];
  readonly weight: number;
  readonly conditions?: Conditions;
  readonly scorers?: string[];
  readonly isRoot?: boolean;
  readonly target: ScopeType;

  constructor(definition: ITaskDefinition) {
    this.name = definition.name;
    this.taskType = definition.taskType;
    this.subtasks = definition.subtasks;
    this.weight = definition.weight || 1;
    this.conditions = definition.conditions;
    this.scorers = definition.scorers;
    this.isRoot = definition.isRoot;
    this.target = definition.target;
  }

  validate<B extends Blackboard, T extends Entity>(context: B, target: T) {
    if (this.conditions) {
      return validateConditions(this.conditions, target);
    }
    return true;
  }

  getScorers() {
    return (
      this.scorers?.map(
        (scorerName) =>
          DefinitionManager.instance.get<ScorerDefinition>('SCORER', scorerName)
            .scorer
      ) || []
    );
  }

  getTargets<T extends Entity>(context: GameBlackboard, target: T) {
    const scope = getScopeFrom(this.target, target, context);
    return 'length' in scope ? scope : [scope];
  }
}

export const isComplexTaskDefinition = (
  definition: ITaskDefinition
): definition is ComplexTaskDefinition =>
  !!definition.subtasks && !!definition.taskType;

export const isPrimitiveTaskDefinition = (
  definition: ITaskDefinition
): definition is PrimitiveTaskDefinition => !!definition.weight;
