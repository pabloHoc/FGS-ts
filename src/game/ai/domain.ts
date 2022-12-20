import { isComplexTaskDefinition, TaskDefinition } from '../definitions/task';
import { Domain as IDomain } from '../utility-ai/domain';
import { Entity } from '../entities';
import { HighestScoreTask } from '../utility-ai/complex-tasks/highest-score-task';
import { PrimitiveTask } from '../utility-ai/primitive-task';

import { GameBlackboard } from '../core/game-blackboard';
import { Empire } from '../entities/empire';
import { Region } from '../entities/region';
import { Task } from '../utility-ai/task';

export class Domain<Context extends GameBlackboard, Target extends Entity>
  implements IDomain<Context, Target>
{
  private taskDefinitions: TaskDefinition[];
  private context: Context;
  private target: Target;
  readonly rootTaskName: string;

  constructor(
    taskDefinitions: TaskDefinition[],
    context: Context,
    target: Target
  ) {
    this.taskDefinitions = taskDefinitions;
    this.context = context;
    this.target = target;

    const rootTaskDefinition = taskDefinitions.find(
      (taskDefinition) => taskDefinition.isRoot
    );

    if (!rootTaskDefinition) throw Error('NO ROOT TASK FOUND IN DOMAIN');

    this.rootTaskName = rootTaskDefinition.name;
  }

  private getTask<T extends Target | Empire | Region>(
    taskDefinition: TaskDefinition,
    target: T
  ) {
    if (isComplexTaskDefinition(taskDefinition)) {
      return new HighestScoreTask<Context, T>(
        taskDefinition.name,
        taskDefinition.weight,
        taskDefinition.validate,
        taskDefinition.getScorers(),
        taskDefinition.subtasks,
        this.context,
        target
      );
    }

    return new PrimitiveTask<Context, Target | Empire | Region>(
      taskDefinition.name,
      taskDefinition.weight,
      taskDefinition.validate,
      taskDefinition.getScorers(),
      this.context,
      target
    );
  }

  getTasks(taskNames: string[]) {
    return taskNames.reduce<Task<Context, Target>[]>((tasks, taskName) => {
      const taskDefinition = this.taskDefinitions.find(
        (task) => task.name === taskName
      );
      if (!taskDefinition) throw Error(`TASK ${taskName} NOT FOUND IN DOMAIN`);

      const targets = taskDefinition.getTargets(this.context, this.target);
      tasks.push(
        ...targets.map((target) => this.getTask(taskDefinition, target))
      );
      return tasks;
    }, []);
  }
}
