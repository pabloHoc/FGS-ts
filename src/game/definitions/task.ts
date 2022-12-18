import { Definition } from '.';
import { Conditions } from '../conditions/validator';

type TaskType = 'highest-score';

interface BaseTaskDefinition extends Definition {
  type: 'TASK';
  name: string;
  conditions?: Conditions;
  scorers?: string[];
  weight?: number;
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

  constructor(definition: ITaskDefinition) {
    this.name = definition.name;
    this.taskType = definition.taskType;
    this.subtasks = definition.subtasks;
    this.weight = definition.weight || 1;
    this.conditions = definition.conditions;
    this.scorers = definition.scorers;
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
