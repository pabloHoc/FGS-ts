import { Blackboard } from './blackboard';
import { PrimitiveTask } from './primitive-task';
import { Scorer } from './scorer';
import { Task, TaskValidator } from './task';

export abstract class ComplexTask<
  Context extends Blackboard,
  Target
> extends PrimitiveTask<Context, Target> {
  subTaskNames: string[];

  constructor(
    name: string,
    weight: number,
    validator: TaskValidator<Context, Target> = () => true,
    scorers: Scorer[] = [],
    subTaskNames: string[],
    context: Context,
    target: Target
  ) {
    super(name, weight, validator, scorers, context, target);
    this.subTaskNames = subTaskNames;
  }

  abstract getScoredTasks(
    subTasks: Task<Context, Target>[]
  ): Task<Context, Target>[];
}

export const isComplexTask = <Context extends Blackboard, Target>(
  task: Task<Context, Target>
): task is ComplexTask<Context, Target> => 'getScoredTasks' in task;
