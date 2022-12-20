import { Blackboard } from '../blackboard';
import { ComplexTask } from '../complex-task';
import { Task } from '../task';

export class HighestScoreTask<
  Context extends Blackboard,
  Target
> extends ComplexTask<Context, Target> {
  getScoredTasks(subTasks: Task<Context, Target>[]) {
    let highestScore = 0.0;
    let highestScoreTask: Task<Context, Target> = subTasks[0];

    for (const task of subTasks) {
      if (task.getScore() > highestScore) {
        highestScore = task.getScore();
        highestScoreTask = task;
      }
    }

    return [highestScoreTask];
  }
}
