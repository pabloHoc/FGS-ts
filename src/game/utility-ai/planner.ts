import { Blackboard } from './blackboard';
import { ComplexTask, isComplexTask } from './complex-task';
import { Domain } from './domain';
import { isPrimitiveTask, PrimitiveTask } from './primitive-task';
import { Task } from './task';

export class Planner<Context extends Blackboard, Target> {
  private tasksToProcess: Task<Context, Target>[] = [];
  private domain: Domain<Context, Target>;
  finalTasks: PrimitiveTask<Context, Target>[] = [];

  constructor(domain: Domain<Context, Target>) {
    this.domain = domain;
  }

  generatePlan() {
    this.resetPlan();

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
    this.tasksToProcess = [this.domain.getTasks([this.domain.rootTaskName])[0]];
    this.finalTasks = [];
  }

  executePlan() {
    for (const task of this.finalTasks) {
      console.log('EXECUTING TASK', task);
      task.execute();
    }
  }

  processPrimitiveTask(task: PrimitiveTask<Context, Target>) {
    if (task.isValid()) {
      this.finalTasks.push(task);
    }
  }

  processCompoundTask(task: ComplexTask<Context, Target>) {
    if (task.isValid()) {
      const subTasks = this.domain.getTasks(task.subTaskNames);
      const validSubTasks = subTasks.filter((task) => task.isValid());
      this.tasksToProcess.push(...task.getScoredTasks(validSubTasks));
    }
  }
}
