import { Condition } from '../conditions';
import { Conditions, validateConditions } from '../conditions/validator';
import { Entity } from '../entities';
import { Blackboard } from './blackboard';
import { isPrimitiveTask } from './primitive-task';
import { Task, TaskType } from './task';

export abstract class ComplexTask<B extends Blackboard, E extends Entity>
  implements Task<B, E>
{
  readonly type = TaskType.Complex;
  readonly name: string;
  readonly subTasks: Task<B, E>[];
  private conditions: Conditions;
  protected score: number = 1.0; // TODO: review default score

  constructor(
    name: string,
    subTasks: Task<B, E>[],
    conditions: Conditions = {}
  ) {
    this.name = name;
    this.subTasks = subTasks;
    this.conditions = conditions;
  }

  isValid(context: B, entity: E) {
    return validateConditions(this.conditions, entity);
  }

  abstract computeScore(context: B, entity: E): void;

  getScore() {
    return this.score;
  }

  abstract getScoredTasks(context: B, entity: E): Task<B, E>[];
}

export const isComplexTask = <B extends Blackboard, E extends Entity>(
  task: Task<B, E>
): task is ComplexTask<B, E> => task.type === TaskType.Complex;
