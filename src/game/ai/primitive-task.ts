import { Condition } from '../conditions';
import { Entity } from '../entities';
import { Blackboard } from './blackboard';
import { Scorer } from './scorer';
import { Task, TaskType } from './task';

export abstract class PrimitiveTask<B extends Blackboard, E extends Entity>
  implements Task<B, E>
{
  readonly type = TaskType.Primitive;
  readonly name: string;
  private conditions: Condition<B, E>[];
  private scorers: Scorer<B, E>[];
  protected score: number = 1.0;

  constructor(
    name: string,
    conditions: Condition<B, E>[] = [],
    scorers: Scorer<B, E>[] = []
  ) {
    this.name = name;
    this.conditions = conditions;
    this.scorers = scorers;
  }

  isValid(context: B, entity: E) {
    for (const condition of this.conditions) {
      if (!condition(context, entity)) {
        return false;
      }
    }
    return true;
  }

  computeScore(context: B, entity: E) {
    for (const scorer of this.scorers) {
      this.score *= scorer.score(context, entity);
    }
  }

  getScore() {
    return this.score;
  }

  execute(entity: E) {}
}

export const isPrimitiveTask = <B extends Blackboard, E extends Entity>(
  task: Task<B, E>
): task is PrimitiveTask<B, E> => task.type === TaskType.Primitive;
