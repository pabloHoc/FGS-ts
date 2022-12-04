import { PrimitiveTask } from '../ai/primitive-task';
import { createArmy } from '../commands/create-army';
import { hasFood } from '../conditions/empire/has-food';
import { hasIron } from '../conditions/empire/has-iron';
import { hasWood } from '../conditions/empire/has-wood';
import { GameBlackboard } from '../core/blackboard';
import { CommandExecutor } from '../core/command-executor';
import { GlobalGameBlackboard } from '../core/game-context';
import { Empire } from '../entities/empire';
import { Region } from '../entities/region';

export class CreateArmy extends PrimitiveTask<GameBlackboard, Empire> {
  constructor() {
    super('CREATE_ARMY', [hasFood(10)]);
  }

  computeScore(context: GameBlackboard, entity: Empire): void {
    this.score = 1;
    console.log(this.name, this.score);
  }

  override execute(empire: Empire): void {
    const region = GlobalGameBlackboard.instance
      .getAllEntities<Region>('REGION')
      .find((region) => region.empireId === empire.id);

    if (region) {
      CommandExecutor.instance.execute(
        createArmy(100, 10, 1, empire.id, region.id)
      );
    }
  }
}
