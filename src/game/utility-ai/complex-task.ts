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
    subTasks: Task<Context, Target>[],
    context: Context,
    target: Target
  ) {
    super(name, weight, validator, scorers, context, target);
    this.subTasks = subTasks;
  }

  computeScore() {
    for (const task of this.subTasks) {
      task.computeScore();
    }
    super.computeScore();
  }

  abstract getScoredTasks(): Task<Context, Target>[];
}

export const isComplexTask = <Context extends Blackboard, Target>(
  task: Task<Context, Target>
): task is ComplexTask<Context, Target> => 'getScoredTasks' in task;
