import { Entity } from '../entities';
import { Blackboard } from './blackboard';
import { Task } from './task';

export class Domain<B extends Blackboard, E extends Entity> {
  private tasks: { [k: string]: Task<B, E> } = {};
  rootTask: Task<B, E>;

  constructor(rootTask: Task<B, E>) {
    this.rootTask = rootTask;
  }

  addTask(task: Task<B, E>) {
    this.tasks[task.name] = task;
  }

  getTask(taskName: string) {
    return this.tasks[taskName];
  }

  getTasks(taskNames: string[]) {
    return taskNames.reduce<Task<B, E>[]>(
      (tasks: Task<B, E>[], taskName: string) => {
        tasks.push(this.tasks[taskName]);
        return tasks;
      },
      []
    );
  }
}
