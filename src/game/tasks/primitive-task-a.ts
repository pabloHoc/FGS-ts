import { PrimitiveTask } from '../ai/primitive-task';
import { GameBlackboard } from '../core/blackboard';
import { Empire } from '../entities/empire';

export class PrimitiveTaskA extends PrimitiveTask<GameBlackboard, Empire> {
  constructor() {
    super('TASK A');
  }

  computeScore(context: GameBlackboard, entity: Empire): void {
    this.score = 0.7;
    console.log(this.name, this.score);
  }
}
