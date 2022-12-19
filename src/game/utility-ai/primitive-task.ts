import { Blackboard } from './blackboard';
import { InputValue } from './input-value';
import { Scorer } from './scorer';
import { Task, TaskValidator } from './task';

export class PrimitiveTask<Context extends Blackboard, Target>
  implements Task<Context, Target>
{
  readonly name: string;
  private scorers: Scorer[];
  private weight: number = 1.0; // weight is the max possible score
  private score: number = 1.0;
  private validator: TaskValidator<Context, Target>;
  // private momentum = 1.25;

  constructor(
    name: string,
    weight: number,
    validator: TaskValidator<Context, Target> = () => true,
    scorers: Scorer[] = []
  ) {
    this.name = name;
    this.validator = validator;
    this.scorers = scorers;
    this.weight = weight;
  }

  isValid(context: Context, target: Target) {
    return this.validator(context, target);
  }

  /**
   * We could have different ways to score scorer:
   * allOrNothing, FixedScore, SumOfChildThresold
   */
  computeScore(context: Context, target: Target) {
    const inputValue = new InputValue(context, target);
    const compensationFactor = 1.0 - 1.0 / this.scorers.length; // TODO: compute momentum and bonus here
    let result = this.weight;

    for (const scorer of this.scorers) {
      let finalScore = scorer.score(inputValue); // TODO: add target
      const modification = (1.0 - finalScore) * compensationFactor;
      finalScore += modification * finalScore;
      result *= finalScore;
    }
    this.score = result;

    // if (this == context.last) {
    //   result *= momentum;
    // }
  }

  getScore() {
    return this.score;
  }

  execute() {
    console.log(`TASK ${this.name} EXECUTED`);
  }
}

export const isPrimitiveTask = <Context extends Blackboard, Target>(
  task: Task<Context, Target>
): task is PrimitiveTask<Context, Target> => !('getScoredTasks' in task);
