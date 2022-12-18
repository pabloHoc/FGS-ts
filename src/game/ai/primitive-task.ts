import { Conditions, validateConditions } from '../conditions/validator';
import { GameBlackboard } from '../core/blackboard';
import { Entity } from '../entities';
import { Blackboard } from './blackboard';
import { InputValue } from './input-value';
import { Scorer } from './scorer';
import { Task } from './task';

export class PrimitiveTask<B extends GameBlackboard, E extends Entity>
  implements Task<B, E>
{
  readonly name: string;
  private conditions: Conditions;
  private scorers: Scorer[];
  private weight: number = 1.0;
  private score: number = 1.0;
  // private momentum = 1.25;

  constructor(
    name: string,
    weight: number,
    conditions: Conditions = {},
    scorers: Scorer[] = []
  ) {
    this.name = name;
    this.conditions = conditions;
    this.scorers = scorers;
    this.weight = weight;
  }

  isValid(context: B, entity: E) {
    const result = validateConditions(this.conditions, entity);
    return result;
  }

  /**
   * We could have different ways to score scorer:
   * allOrNothing, FixedScore, SumOfChildThresold
   */
  computeScore(context: B, entity: E) {
    const inputValue = new InputValue(context, entity);
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

export const isPrimitiveTask = <B extends GameBlackboard, E extends Entity>(
  task: Task<B, E>
): task is PrimitiveTask<B, E> => !('getScoredTasks' in task);
