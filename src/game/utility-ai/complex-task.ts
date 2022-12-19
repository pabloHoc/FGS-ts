import { Blackboard } from './blackboard';
import { PrimitiveTask } from './primitive-task';
import { Scorer } from './scorer';
import { Task, TaskValidator } from './task';

export abstract class ComplexTask<
  Context extends Blackboard,
  Target
> extends PrimitiveTask<Context, Target> {
  subTasks: Task<Context, Target>[];

  constructor(
    name: string,
    weight: number,
    validator: TaskValidator<Context, Target> = () => true,
    scorers: Scorer[] = [],
    subTasks: Task<Context, Target>[]
  ) {
    super(name, weight, validator, scorers);
    this.subTasks = subTasks;
  }

  computeScore(context: Context, target: Target) {
    for (const task of this.subTasks) {
      task.computeScore(context, target);
    }
    super.computeScore(context, target);
  }

  abstract getScoredTasks(
    context: Context,
    target: Target
  ): Task<Context, Target>[];
}

export const isComplexTask = <Context extends Blackboard, Target>(
  task: Task<Context, Target>
): task is ComplexTask<Context, Target> => 'getScoredTasks' in task;
