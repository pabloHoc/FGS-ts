import { HighestScoreTask } from '../ai/compound-tasks/highest-score-task';
import { SomeComplexTask } from './complex-task';
import { CreateArmy } from './create-army';
import { HasIron } from './has-iron';
import { HasWood } from './has-wood';

export const winGame = new HighestScoreTask('WIN_GAME', [
  new CreateArmy(),
  new HasWood(),
  new HasIron(),
  new SomeComplexTask(),
]);
