import { Entity } from '../entities';
import { Blackboard } from './blackboard';
import { CompoundTask, isCompoundTask } from './compound-task';
import { Domain } from './domain';
import { isPrimitiveTask, PrimitiveTask } from './primitive-task';
import { Task } from './task';

/**
 * Planner should generate a plan each turn
 */
export class Planner<B extends Blackboard, E extends Entity> {
  private tasksToProcess: Task<B, E>[] = [];
  private domain: Domain<B, E>;
  private rootTaskName?: string;
  private context: B;
  private owner: E;
  finalTasks: string[] = [];

  constructor(
    domain: Domain<B, E>,
    context: B,
    owner: E,
    rootTaskName?: string
  ) {
    this.domain = domain;
    this.context = context;
    this.rootTaskName = rootTaskName || domain.rootTask.name;
    this.owner = owner;
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
      if (isCompoundTask(task)) {
        this.processCompoundTask(task);
      }
    }
  }

  resetPlan() {
    this.tasksToProcess = [this.chooseRootTask()];
    this.finalTasks = [];
  }

  executePlan() {
    for (const taskName of this.finalTasks) {
      const task = this.domain.getTask(taskName) as PrimitiveTask<B, E>;
      console.log(`EXECUTING TASK ${taskName}`);
      task.execute(this.owner);
    }
  }

  chooseRootTask() {
    if (this.rootTaskName !== undefined) {
      const customRootTask = this.domain.getTask(this.rootTaskName);
      if (customRootTask !== undefined) {
        return customRootTask;
      }
    }
    return this.domain.rootTask;
  }

  processPrimitiveTask(task: Task<B, E>) {
    if (task.isValid(this.context, this.owner)) {
      this.finalTasks.push(task.name);
    }
  }

  processCompoundTask(task: CompoundTask<B, E>) {
    if (task.isValid(this.context, this.owner)) {
      const subtaskNames = this.domain.getTasks(task.subtasksNames);
      // subtaskNames.reverse() --> check why
      this.tasksToProcess.push(...subtaskNames);
    }
  }
}
