import { Conditions } from '../conditions/validator';
import { GameBlackboard } from '../core/blackboard';
import { Entity } from '../entities';
import { PrimitiveTask } from './primitive-task';
import { Scorer } from './scorer';
import { Task } from './task';

export abstract class ComplexTask<
  B extends GameBlackboard,
  E extends Entity
> extends PrimitiveTask<B, E> {
  subTasks: Task<B, E>[];

  constructor(
    name: string,
    weight: number,
    conditions: Conditions = {},
    scorers: Scorer[] = [],
    subTasks: Task<B, E>[]
  ) {
    super(name, weight, conditions, scorers);
    this.subTasks = subTasks;
  }

  computeScore(context: B, entity: E) {
    for (const task of this.subTasks) {
      task.computeScore(context, entity);
    }
    super.computeScore(context, entity);
  }

  abstract getScoredTasks(context: B, entity: E): Task<B, E>[];
}

export const isComplexTask = <B extends GameBlackboard, E extends Entity>(
  task: Task<B, E>
): task is ComplexTask<B, E> => 'getScoredTasks' in task;
