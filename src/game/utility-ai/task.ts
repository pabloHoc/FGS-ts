import { Blackboard } from './blackboard';

export interface Task<Context extends Blackboard, Target> {
  readonly name: string;
  isValid: () => boolean;
  getScore: () => number;
}

export type TaskValidator<Context, Target> = (
  context: Context,
  target: Target
) => boolean;
