import { Definition } from '.';
import { Blackboard } from '../ai/blackboard';
import { HighestScoreTask } from '../ai/complex-tasks/highest-score-task';
import { PrimitiveTask } from '../ai/primitive-task';
import { Conditions, validateConditions } from '../conditions/validator';
import { Entity } from '../entities';

type TaskType = 'highest-score';

interface BaseTaskDefinition extends Definition {
  type: 'TASK';
  name: string;
  conditions?: Conditions;
}

interface ComplexTaskDefinition extends BaseTaskDefinition {
  taskType: TaskType;
  subtasks: string[];
  isRoot?: boolean;
}

interface PrimitiveTaskDefinition extends BaseTaskDefinition {
  weight: number;
}

type ITaskDefinition = BaseTaskDefinition &
  Partial<ComplexTaskDefinition & PrimitiveTaskDefinition>;

export class TaskDefinition implements BaseTaskDefinition {
  readonly type = 'TASK';
  readonly name: string;
  readonly taskType?: TaskType;
  readonly subtasks?: string[];
  readonly weight?: number;
  readonly conditions?: Conditions;
  readonly isRoot?: boolean;

  constructor(definition: ITaskDefinition) {
    this.name = definition.name;
    this.taskType = definition.taskType;
    this.subtasks = definition.subtasks;
    this.weight = definition.weight;
    this.conditions = definition.conditions;
    this.isRoot = definition.isRoot;
  }
}

export const isComplexTaskDefinition = (
  definition: ITaskDefinition
): definition is ComplexTaskDefinition =>
  !!definition.subtasks && !!definition.taskType;

export const isPrimitiveTaskDefinition = (
  definition: ITaskDefinition
): definition is PrimitiveTaskDefinition => !!definition.weight;
