import { Condition } from '../conditions';
import { Entity } from '../entities';
import { Blackboard } from './blackboard';
import { isPrimitiveTask } from './primitive-task';
import { Task, TaskType } from './task';

export abstract class CompoundTask<B extends Blackboard, E extends Entity>
  implements Task<B, E>
{
  readonly type = TaskType.Compound;
  readonly name: string;
  readonly subTasks: Task<B, E>[];
  private conditions: Condition<B, E>[];
  protected score: number = 1.0; // TODO: review default score

  constructor(
    name: string,
    subTasks: Task<B, E>[],
    conditions: Condition<B, E>[] = []
  ) {
    this.name = name;
    this.subTasks = subTasks;
    this.conditions = conditions;
  }

  isValid(context: B, entity: E) {
    for (const condition of this.conditions) {
      if (!condition(context, entity)) {
        return false;
      }
    }
    return true;
  }

  abstract computeScore(context: B, entity: E): void;

  getScore() {
    return this.score;
  }

  abstract getScoredTasks(context: B, entity: E): Task<B, E>[];

  decompose() {
    return this.subTasks;
  }
}

export const isCompoundTask = <B extends Blackboard, E extends Entity>(
  task: Task<B, E>
): task is CompoundTask<B, E> => task.type === TaskType.Compound;
