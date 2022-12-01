import { Condition } from '../conditions';
import { Entity } from '../entities';
import { Blackboard } from './blackboard';
import { Task, TaskType } from './task';

export abstract class PrimitiveTask<B extends Blackboard, E extends Entity>
  implements Task<B, E>
{
  readonly type = TaskType.Primitive;
  readonly name: string;
  private conditions: Condition<B, E>[];

  constructor(name: string, conditions: Condition<B, E>[] = []) {
    this.name = name;
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

  execute(entity: E) {}
}

export const isPrimitiveTask = <B extends Blackboard, E extends Entity>(
  task: Task<B, E>
): task is PrimitiveTask<B, E> => task.type === TaskType.Primitive;
