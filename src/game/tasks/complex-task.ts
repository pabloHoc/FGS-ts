import { CompoundTask } from '../ai/compound-task';
import { HighestScoreTask } from '../ai/compound-tasks/highest-score-task';
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
import { PrimitiveTaskA } from './primitive-task-a';
import { PrimitiveTaskB } from './primitive-task-b';

const taskA = new PrimitiveTaskA();
const taskB = new PrimitiveTaskB();

export class SomeComplexTask extends HighestScoreTask<GameBlackboard, Empire> {
  constructor() {
    super('SOME_COMPLEX_TASK', [taskA, taskB]);
  }
}
