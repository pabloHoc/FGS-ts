import { Condition } from '../conditions';
import { Conditions, validateConditions } from '../conditions/validator';
import { Entity } from '../entities';
import { Blackboard } from './blackboard';
import { Scorer } from './scorer';
import { Task, TaskType } from './task';

export class PrimitiveTask<B extends Blackboard, E extends Entity>
  implements Task<B, E>
{
  readonly type = TaskType.Primitive;
  readonly name: string;
  private conditions: Conditions;
  private scorers: Scorer<B, E>[];
  protected score: number = 1.0;

  constructor(
    name: string,
    weight: number,
    conditions: Conditions = {},
    scorers: Scorer<B, E>[] = []
  ) {
    this.name = name;
    this.conditions = conditions;
    this.scorers = scorers;
    this.score = weight;
  }

  isValid(context: B, entity: E) {
    const result = validateConditions(this.conditions, entity);
    console.log(this.name, result);
    return result;
  }

  computeScore(context: B, entity: E) {
    // Dynamically score somehow
    // for (const scorer of this.scorers) {
    //   this.score *= scorer.score(context, entity);
    // }
  }

  getScore() {
    return this.score;
  }

  execute(entity: E) {}
}

export const isPrimitiveTask = <B extends Blackboard, E extends Entity>(
  task: Task<B, E>
): task is PrimitiveTask<B, E> => task.type === TaskType.Primitive;
