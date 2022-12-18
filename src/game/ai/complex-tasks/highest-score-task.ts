import { GameBlackboard } from '../../core/blackboard';
import { Entity } from '../../entities';
import { ComplexTask, isComplexTask } from '../complex-task';
import { Task } from '../task';

export class HighestScoreTask<
  B extends GameBlackboard,
  E extends Entity
> extends ComplexTask<B, E> {
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
