import { DefinitionManager } from '../core/definition-manager';
import { GameBlackboard } from '../core/game-blackboard';
import { TaskDefinition } from '../definitions/task';
import { Empire, EmpireId } from '../entities/empire';
import { TaskTreeBuilder } from './task-tree-builder';
import { Planner } from '../utility-ai/planner';
import { GlobalGameBlackboard } from '../core/game-context';

export class AI {
  private empireId: EmpireId;
  private planner?: Planner<GameBlackboard, Empire>; // JUST FOR DEBUGGING PURPOSES

  constructor(empireId: EmpireId) {
    this.empireId = empireId;
  }

  playTurn() {
    const context = new GameBlackboard();
    const empire = GlobalGameBlackboard.instance.getEntity<Empire>(
      'EMPIRE',
      this.empireId
    );
    const taskTree = new TaskTreeBuilder<Empire>(
      DefinitionManager.instance.getAll<TaskDefinition>('TASK'),
      context,
      empire
    );

    /**
     * ! We are generating the planner each turn, this is needed because tasks are
     * created from current game context, which it can change from turn to turn
     * (e.g.: new agents are created), but we might need to cache things here in
     * order to improve performance since it can grow really big
     */
    this.planner = new Planner<GameBlackboard, Empire>(taskTree.getRootTask());

    this.planner.generatePlan();
    this.planner.executePlan();
  }
}
