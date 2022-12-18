import {
  isComplexTaskDefinition,
  isPrimitiveTaskDefinition,
  TaskDefinition,
} from '../definitions/task';
import { Entity } from '../entities';
import { HighestScoreTask } from './complex-tasks/highest-score-task';
import { isComplexTask } from './complex-task';
import { PrimitiveTask } from './primitive-task';
import { Task } from './task';
import { GameBlackboard } from '../core/blackboard';
import { DefinitionManager } from '../core/definition-manager';
import { ScorerDefinition } from '../definitions/scorer';

export class Domain<B extends GameBlackboard, E extends Entity> {
  private tasks: TaskDefinition[];

  constructor(tasks: TaskDefinition[]) {
    this.tasks = tasks;
  }

  getRootTask() {
    const rootTask = this.generateRootTask();
    this.generateTaskNetwork(rootTask);
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

    return new HighestScoreTask(
      rootTask.name,
      1.0,
      rootTask.conditions,
      [],
      []
    );
  }

  // task doesn't have subtask yet
  private generateTaskNetwork(task: Task<B, E>) {
    const taskDefinition = this.tasks.find((t) => t.name === task.name);
    if (!taskDefinition) {
      throw Error(`TASK ${task.name} NOT FOUND IN DOMAIN`);
    }
    if (isComplexTask(task) && isComplexTaskDefinition(taskDefinition)) {
      for (const subTaskDefinitionName of taskDefinition.subtasks) {
        const subTaskDefinition = this.tasks.find(
          (task) => task.name === subTaskDefinitionName
        );
        if (!subTaskDefinition) {
          throw Error(`TASK ${subTaskDefinitionName} NOT FOUND IN DOMAIN`);
        }

        const scorers = subTaskDefinition.scorers?.map(
          (scorerName) =>
            DefinitionManager.instance.get<ScorerDefinition>(
              'SCORER',
              scorerName
            ).scorer
        );

        if (isComplexTaskDefinition(subTaskDefinition)) {
          const subTask = new HighestScoreTask(
            subTaskDefinition.name,
            subTaskDefinition.weight, // TODO: do we need this here?
            subTaskDefinition.conditions,
            scorers,
            []
          );
          task.subTasks.push(subTask);
          this.generateTaskNetwork(subTask);
        } else if (isPrimitiveTaskDefinition(subTaskDefinition)) {
          const subTask = new PrimitiveTask(
            subTaskDefinition.name,
            subTaskDefinition.weight,
            subTaskDefinition.conditions,
            scorers
          );
          task.subTasks.push(subTask);
        }
      }
    }
  }
}
