import { Condition } from '../conditions';
import { Entity } from '../entities';
import { Blackboard } from './blackboard';
import { Task, TaskType } from './task';

export class CompoundTask<B extends Blackboard, E extends Entity>
  implements Task<B, E>
{
  readonly type = TaskType.Compound;
  readonly name: string;
  readonly subtasksNames: string[];
  private conditions: Condition<B, E>[];

  constructor(
    name: string,
    subtasksNames: string[],
    conditions: Condition<B, E>[] = []
  ) {
    this.name = name;
    this.subtasksNames = subtasksNames;
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

  decompose() {
    return this.subtasksNames;
  }
}

export const isCompoundTask = <B extends Blackboard, E extends Entity>(
  task: Task<B, E>
): task is CompoundTask<B, E> => task.type === TaskType.Compound;
