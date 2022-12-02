import { PrimitiveTask } from '../ai/primitive-task';
import { GameBlackboard } from '../core/blackboard';
import { Empire } from '../entities/empire';

export class HasWood extends PrimitiveTask<GameBlackboard, Empire> {
  constructor() {
    super('HAS_WOOD');
  }

  computeScore(context: GameBlackboard, entity: Empire): void {
    this.score = 0.3;
    console.log(this.name, this.score);
  }

  override execute(empire: Empire): void {}
}
