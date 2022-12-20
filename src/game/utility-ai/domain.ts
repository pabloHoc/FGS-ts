import { Blackboard } from './blackboard';
import { Task } from './task';

export interface Domain<Context extends Blackboard, Target> {
  rootTaskName: string;
  getTasks(taskNames: string[]): Task<Context, Target>[];
}
