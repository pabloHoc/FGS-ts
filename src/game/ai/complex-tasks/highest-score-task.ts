import { Entity } from '../../entities';
import { Blackboard } from '../blackboard';
import { ComplexTask, isComplexTask } from '../compound-task';
import { Task } from '../task';

/**
 * class DecisionMaker { // -> this belongs to a CompoundTask
 *  const cutoff = 0
 *  const decisionss: DecisionScoreEvaluator[]
 *
 *  for (const decision of this.decisions) {
 *   const score = decision.score(bonus, cutoff)
 *   if (score > cutoff)
 *     cutoff = score
 *  }
 * }
 */

/**
 * class DecisionScoreEvaluator { // -> This belongs to a PrimitiveTask
 *  scorers: Scorer[] = []
 *  weight: number
 *  momentum: number
 *  bonus?: number
 *
 *  score() {
 *    const finalScore = bonus (weight + momentum + bonus)
 *    for (const scorer of this.scorers) {
 *      if (0 < finalScore || finalScore < min)
 *        break
 *      const score = scorer.score(context, entity) // -> here we can have higher puntuation, this is a consideration (*)
 *      const curve = curve.computeCurve(score) // -> here we actually pass the score to the curve to get the utility
 *
 *      finalScore *= Math.clamp(curve, 0, 1)   // -> clamp the value
 *    }
 *    return finalScore
 *  }
 * }
 *
 * (*) scorer/consideration has:
 * - input parameter (min, max)
 * - response curve parameter (type, m, k, b, c)
 */

/**
 * class EnemiesCloseConsideration {
 *  score (context: Blackboard) {
 *    const enemiesClose = context.getEnemiesClose().length
 *
 *    // input parameter
 *    const minEnemies = this.MIN_ENEMIES
 *    const maxEnemies = this.MAX_ENEMIES // to consider
 *
 *    return normalize(enemiesClose, mixEnemies, maxEnemies)
 *  }
 * }
 */

export class HighestScoreTask<
  B extends Blackboard,
  E extends Entity
> extends ComplexTask<B, E> {
  computeScore(context: B, entity: E): void {
    let score = 1.0;
    for (const task of this.subTasks) {
      if (task.isValid(context, entity)) {
        task.computeScore(context, entity);
        console.log(task.name, task.getScore());
        score *= task.getScore(); // factor
      }
    }
    this.score = Number(score.toFixed(2));
    console.log(this.name, this.score);
  }

  getScoredTasks(context: B, entity: E) {
    let highestScore = 0.0;
    let highestScoreTask: Task<B, E> = this.subTasks[0];

    for (const task of this.subTasks) {
      if (task.isValid(context, entity) && task.getScore() > highestScore) {
        highestScore = task.getScore();
        highestScoreTask = task;
      }
    }

    if (isComplexTask(highestScoreTask)) {
      return highestScoreTask.getScoredTasks(context, entity);
    }

    return [highestScoreTask];
  }
}
