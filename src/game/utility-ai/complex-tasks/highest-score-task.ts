import { Blackboard } from '../blackboard';
import { ComplexTask, isComplexTask } from '../complex-task';
import { Task } from '../task';

export class HighestScoreTask<
  Context extends Blackboard,
  Target
> extends ComplexTask<Context, Target> {
  getScoredTasks() {
    let highestScore = 0.0;
    let highestScoreTask: Task<Context, Target> = this.subTasks[0];

    for (const task of this.subTasks) {
      if (task.isValid() && task.getScore() > highestScore) {
        highestScore = task.getScore();
        highestScoreTask = task;
      }
    }

    if (isComplexTask(highestScoreTask)) {
      return highestScoreTask.getScoredTasks();
    }

    return [highestScoreTask];
  }
}
