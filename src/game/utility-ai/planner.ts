import { Blackboard } from './blackboard';
import { ComplexTask, isComplexTask } from './complex-task';
import { isPrimitiveTask, PrimitiveTask } from './primitive-task';
import { Task } from './task';

export class Planner<Context extends Blackboard, Target> {
  private tasksToProcess: Task<Context, Target>[] = [];
  private rootTask: Task<Context, Target>;
  finalTasks: PrimitiveTask<Context, Target>[] = [];

  constructor(rootTask: ComplexTask<Context, Target>) {
    this.rootTask = rootTask;
  }

  generatePlan() {
    this.resetPlan();
    this.scoreTasks();

    while (this.tasksToProcess.length) {
      const task = this.tasksToProcess.pop();
      if (!task) {
        break;
      }
      if (isPrimitiveTask(task)) {
        this.processPrimitiveTask(task);
      }
      if (isComplexTask(task)) {
        this.processCompoundTask(task);
      }
    }
  }

  resetPlan() {
    this.tasksToProcess = [this.rootTask];
    this.finalTasks = [];
  }

  executePlan() {
    for (const task of this.finalTasks) {
      console.log(`EXECUTING TASK ${task.name}`);
      task.execute();
    }
  }

  scoreTasks() {
    this.rootTask.computeScore();
  }

  processPrimitiveTask(task: PrimitiveTask<Context, Target>) {
    if (task.isValid()) {
      this.finalTasks.push(task);
    }
  }

  processCompoundTask(task: ComplexTask<Context, Target>) {
    if (task.isValid()) {
      this.tasksToProcess.push(...task.getScoredTasks());
    }
  }
}
