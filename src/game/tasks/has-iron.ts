import { PrimitiveTask } from '../ai/primitive-task';
import { hasIron } from '../conditions/empire/has-iron';
import { GameBlackboard } from '../core/blackboard';
import { Empire } from '../entities/empire';

export class HasIron extends PrimitiveTask<GameBlackboard, Empire> {
  constructor() {
    super('HAS_IRON');
  }

  computeScore(context: GameBlackboard, entity: Empire): void {
    this.score = 0.2;
    console.log(this.name, this.score);
  }

  override execute(empire: Empire): void {}
}
