import { DefinitionManager } from '../core/definition-manager';
import { GameBlackboard } from '../core/game-blackboard';
import { TaskDefinition } from '../definitions/task';
import { Empire, EmpireId } from '../entities/empire';
import { TaskTreeBuilder } from './task-tree-builder';
import { Planner } from '../utility-ai/planner';
import { GlobalGameBlackboard } from '../core/game-context';

export class AI {
  private planner: Planner<GameBlackboard, Empire>;

  constructor(empireID: EmpireId) {
    const domain = new TaskTreeBuilder(
      DefinitionManager.instance.getAll<TaskDefinition>('TASK')
    );

    this.planner = new Planner<GameBlackboard, Empire>(
      new GameBlackboard(),
      GlobalGameBlackboard.instance.getEntity<Empire>('EMPIRE', empireID),
      domain.getRootTask()
    );
  }

  playTurn() {
    this.planner.generatePlan();
    this.planner.executePlan();
  }
}
