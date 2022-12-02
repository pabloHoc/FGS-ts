import { PrimitiveTask } from '../ai/primitive-task';
import { GameBlackboard } from '../core/blackboard';
import { Empire } from '../entities/empire';

export class PrimitiveTaskB extends PrimitiveTask<GameBlackboard, Empire> {
  constructor() {
    super('TASK B');
  }

  computeScore(context: GameBlackboard, entity: Empire): void {
    this.score = 0.9;
    console.log(this.name, this.score);
  }
}
