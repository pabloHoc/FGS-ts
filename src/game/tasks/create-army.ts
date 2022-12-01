import { PrimitiveTask } from '../ai/primitive-task';
import { createArmy } from '../commands/create-army';
import { hasResources } from '../conditions/empire/has-resources';
import { GameBlackboard } from '../core/blackboard';
import { CommandExecutor } from '../core/command-executor';
import { GlobalGameBlackboard } from '../core/game-context';
import { Empire } from '../entities/empire';
import { Region } from '../entities/region';

export class CreateArmy extends PrimitiveTask<GameBlackboard, Empire> {
  constructor() {
    super('CREATE_ARMY', [hasResources]);
  }

  override execute(empire: Empire): void {
    const region = GlobalGameBlackboard.instance
      .getAllEntities<Region>('REGION')
      .find((region) => region.empireId === empire.id);

    if (region) {
      CommandExecutor.instance.execute(createArmy(100, empire.id, region.id));
    }
  }
}
