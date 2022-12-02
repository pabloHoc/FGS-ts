import { Entity } from '../entities';
import { Blackboard } from './blackboard';
import { CompoundTask, isCompoundTask } from './compound-task';
import { isPrimitiveTask, PrimitiveTask } from './primitive-task';
import { Task } from './task';

/**
 * Planner should generate a plan each turn
 */
export class Planner<B extends Blackboard, E extends Entity> {
  private tasksToProcess: Task<B, E>[] = [];
  private rootTask: Task<B, E>;
  private context: B;
  private owner: E;
  finalTasks: PrimitiveTask<B, E>[] = [];

  constructor(context: B, owner: E, rootTask: Task<B, E>) {
    this.context = context;
    this.rootTask = rootTask;
    this.owner = owner;
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
      if (isCompoundTask(task)) {
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
      task.execute(this.owner);
    }
  }

  scoreTasks() {
    this.rootTask.computeScore(this.context, this.owner);
  }

  processPrimitiveTask(task: PrimitiveTask<B, E>) {
    if (task.isValid(this.context, this.owner)) {
      this.finalTasks.push(task);
    }
  }

  processCompoundTask(task: CompoundTask<B, E>) {
    if (task.isValid(this.context, this.owner)) {
      this.tasksToProcess.push(
        ...task.getScoredTasks(this.context, this.owner)
      );
    }
  }
}
