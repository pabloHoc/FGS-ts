import { Blackboard } from './blackboard';

export interface Task<Context extends Blackboard, Target> {
  readonly name: string;
  isValid: TaskValidator<Context, Target>;
  computeScore: (context: Context, target: Target) => void;
  getScore: () => number;
}

export type TaskValidator<Context, Target> = (
  context: Context,
  target: Target
) => boolean;
