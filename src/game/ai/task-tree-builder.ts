import {
  isComplexTaskDefinition,
  isPrimitiveTaskDefinition,
  TaskDefinition,
} from '../definitions/task';
import { Entity } from '../entities';
import { HighestScoreTask } from '../utility-ai/complex-tasks/highest-score-task';
import { isComplexTask } from '../utility-ai/complex-task';
import { PrimitiveTask } from '../utility-ai/primitive-task';
import { Task } from '../utility-ai/task';
import { GameBlackboard } from '../core/game-blackboard';
import { Empire } from '../entities/empire';
import { Region } from '../entities/region';

export class TaskTreeBuilder<Target extends Entity> {
  private tasks: TaskDefinition[];
  private context: GameBlackboard;
  private target: Target;

  // TODO: remove this type from here (abstrqct it)
  constructor(
    tasks: TaskDefinition[],
    context: GameBlackboard,
    target: Target
  ) {
    this.tasks = tasks;
    this.context = context;
    this.target = target;
  }

  getRootTask() {
    const rootTask = this.generateRootTask();
    this.generateTaskTree(rootTask);
    return rootTask;
  }

  private generateRootTask() {
    const rootTask = this.tasks.find((task) => task.isRoot);

    if (!rootTask) {
      throw Error('NO ROOT TASK FOUND');
    }

    if (!isComplexTaskDefinition(rootTask)) {
      throw Error('ROOT TASK IS NOT A COMPLEX TASK');
    }

    // We create a complex task without subtask and we recursively create
    // the task tree from the subtasks names in the task definition
    return new HighestScoreTask<GameBlackboard, Target>(
      rootTask.name,
      1.0,
      rootTask.validate,
      [], // The root task shouldn't have any scorer
      [],
      this.context,
      this.target
    );
  }

  private generateTaskTree(task: Task<GameBlackboard, Target>) {
    const taskDefinition = this.tasks.find((t) => t.name === task.name);
    if (!taskDefinition) {
      throw Error(`TASK ${task.name} NOT FOUND`);
    }
    if (!isComplexTask(task) || !isComplexTaskDefinition(taskDefinition)) {
      throw Error('TASK NETWORK CAN BE GENERATED FROM A COMPLEX TASK ONLY');
    }

    for (const subTaskDefinitionName of taskDefinition.subtasks) {
      const subTaskDefinition = this.tasks.find(
        (task) => task.name === subTaskDefinitionName
      );
      if (!subTaskDefinition) {
        throw Error(`TASK ${subTaskDefinitionName} NOT FOUND`);
      }

      const targets = subTaskDefinition.getTargets(this.context, this.target);

      for (const target of targets) {
        if (isComplexTaskDefinition(subTaskDefinition)) {
          const subTask = new HighestScoreTask<
            GameBlackboard,
            Target | Empire | Region
          >(
            subTaskDefinition.name,
            subTaskDefinition.weight,
            subTaskDefinition.validate,
            subTaskDefinition.getScorers(),
            [],
            this.context,
            target
          );
          task.subTasks.push(subTask);
          this.generateTaskTree(subTask);
        } else if (isPrimitiveTaskDefinition(subTaskDefinition)) {
          const subTask = new PrimitiveTask<
            GameBlackboard,
            Target | Empire | Region
          >(
            subTaskDefinition.name,
            subTaskDefinition.weight,
            subTaskDefinition.validate,
            subTaskDefinition.getScorers(),
            this.context,
            target
          );
          task.subTasks.push(subTask);
        }
      }
    }
  }
}
