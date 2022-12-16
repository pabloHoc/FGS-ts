import {
  isComplexTaskDefinition,
  isPrimitiveTaskDefinition,
  TaskDefinition,
} from '../definitions/task';
import { Entity } from '../entities';
import { Blackboard } from './blackboard';
import { HighestScoreTask } from './complex-tasks/highest-score-task';
import { isComplexTask } from './compound-task';
import { PrimitiveTask } from './primitive-task';
import { Task } from './task';

export class Domain<B extends Blackboard, E extends Entity> {
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

    return new HighestScoreTask(rootTask.name, [], rootTask.conditions);
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

        if (isComplexTaskDefinition(subTaskDefinition)) {
          const subTask = new HighestScoreTask(
            subTaskDefinition.name,
            [],
            subTaskDefinition.conditions
          );
          task.subTasks.push(subTask);
          this.generateTaskNetwork(subTask);
        } else if (isPrimitiveTaskDefinition(subTaskDefinition)) {
          const subTask = new PrimitiveTask(
            subTaskDefinition.name,
            subTaskDefinition.weight,
            subTaskDefinition.conditions
          );
          task.subTasks.push(subTask);
        }
      }
    }
  }
}
