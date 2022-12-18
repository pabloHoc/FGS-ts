import { GameBlackboard } from '../core/blackboard';
import { Entity } from '../entities';
import { ComplexTask, isComplexTask } from './complex-task';
import { Domain } from './domain';
import { isPrimitiveTask, PrimitiveTask } from './primitive-task';
import { Task } from './task';

/**
 * Planner should generate a plan each turn
 */
export class Planner<B extends GameBlackboard, E extends Entity> {
  private tasksToProcess: Task<B, E>[] = [];
  private rootTask: Task<B, E>;
  private context: B;
  private owner: E;
  finalTasks: PrimitiveTask<B, E>[] = [];

  constructor(context: B, owner: E, domain: Domain<B, E>) {
    this.context = context;
    this.owner = owner;

    this.rootTask = domain.getRootTask();
  }

  // assumption: complex task doesn't have child at this point

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
    this.rootTask.computeScore(this.context, this.owner);
  }

  processPrimitiveTask(task: PrimitiveTask<B, E>) {
    if (task.isValid(this.context, this.owner)) {
      this.finalTasks.push(task);
    }
  }

  processCompoundTask(task: ComplexTask<B, E>) {
    if (task.isValid(this.context, this.owner)) {
      this.tasksToProcess.push(
        ...task.getScoredTasks(this.context, this.owner)
      );
    }
  }
}
