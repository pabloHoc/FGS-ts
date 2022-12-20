import { sendAgentToConquestRegion } from '../ai/actions/send-agent-to-conquest-region';
import { GameBlackboard } from '../core/game-blackboard';
import { Empire } from '../entities/empire';
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
  private validator: TaskValidator<Context, Target>;
  // private momentum = 1.25;
  protected context: Context;
  protected target: Target;

  constructor(
    name: string,
    weight: number,
    validator: TaskValidator<Context, Target> = () => true,
    scorers: Scorer[] = [],
    context: Context,
    target: Target
  ) {
    this.name = name;
    this.validator = validator;
    this.scorers = scorers;
    this.weight = weight;
    this.context = context;
    this.target = target;
  }

  isValid() {
    return this.validator(this.context, this.target);
  }

  /**
   * We could have different ways to score scorer:
   * allOrNothing, FixedScore, SumOfChildThresold
   */
  getScore() {
    const inputValue = new InputValue(this.context, this.target);
    const compensationFactor = 1.0 - 1.0 / this.scorers.length; // TODO: compute momentum and bonus here
    let result = this.weight;

    for (const scorer of this.scorers) {
      let finalScore = scorer.score(inputValue); // TODO: add target
      const modification = (1.0 - finalScore) * compensationFactor;
      finalScore += modification * finalScore;
      result *= finalScore;
    }
    return result;

    // if (this == context.last) {
    //   result *= momentum;
    // }
  }

  execute() {
    sendAgentToConquestRegion(
      this.context as unknown as GameBlackboard,
      this.target as unknown as Empire
    );
    console.log(`TASK ${this.name} EXECUTED`);
  }
}

export const isPrimitiveTask = <Context extends Blackboard, Target>(
  task: Task<Context, Target>
): task is PrimitiveTask<Context, Target> => !('getScoredTasks' in task);
