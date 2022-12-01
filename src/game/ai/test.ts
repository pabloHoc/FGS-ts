// import { isPlayer } from '../conditions/empire/is-player';
// import { GameBlackboard } from '../core/blackboard';
// import { GlobalGameBlackboard } from '../core/game-context';
// import { createEmpire, Empire } from '../entities/empire';
// import { CompoundTask } from './compound-task';
// import { Domain } from './domain';
// import { Planner } from './planner';
// import { PrimitiveTask } from './primitive-task';

// const waitTurn = new PrimitiveTask('Wait turn');
// const sellResource = new PrimitiveTask('Sell resource');
// const raiseTaxes = new PrimitiveTask('Raise taxes');

// const getGold = new CompoundTask('Get gold', [
//   waitTurn.name,
//   sellResource.name,
//   raiseTaxes.name,
// ]);

// const buildArmy = new CompoundTask('Build army', [getGold.name]);
// const defeatEmpire = new CompoundTask('Defeat empire', [buildArmy.name]);

// const domain = new Domain(defeatEmpire);

// domain.addTask(buildArmy);
// domain.addTask(getGold);
// domain.addTask(raiseTaxes);
// domain.addTask(waitTurn);
// domain.addTask(sellResource);

// const context = new GameBlackboard();
// const empire = createEmpire('AI EMPIRE');

// export const planner = new Planner<GameBlackboard, Empire>(
//   domain,
//   context,
//   empire
// );

export default {};
