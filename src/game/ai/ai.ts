import { DefinitionManager } from '../core/definition-manager';
import { GameBlackboard } from '../core/game-blackboard';
import { TaskDefinition } from '../definitions/task';
import { Empire, EmpireId } from '../entities/empire';
import { Domain } from './domain';
import { Planner } from '../utility-ai/planner';
import { GlobalGameBlackboard } from '../core/game-context';

export class AI {
  private empireId: EmpireId;
  private planner?: Planner<GameBlackboard, Empire>; // JUST FOR DEBUGGING PURPOSES

  constructor(empireId: EmpireId) {
    this.empireId = empireId;
  }

  playTurn() {
    const domain = new Domain<GameBlackboard, Empire>(
      DefinitionManager.instance.getAll<TaskDefinition>('TASK'),
      GlobalGameBlackboard.instance, // this.context -> new GameBlackboard();,
      GlobalGameBlackboard.instance.getEntity<Empire>('EMPIRE', this.empireId)
    );

    /**
     * ! We are generating the planner each turn, this is needed because tasks are
     * created from current game context, which it can change from turn to turn
     * (e.g.: new agents are created), but we might need to cache things here in
     * order to improve performance since it can grow really big
     */
    this.planner = new Planner<GameBlackboard, Empire>(domain);

    this.planner.generatePlan();
    this.planner.executePlan();
  }
}
