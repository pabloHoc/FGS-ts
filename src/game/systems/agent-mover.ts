import { System } from '.';
import { Dispatcher } from '../core/dispatcher';
import { DefinitionManager } from '../core/definition-manager';
import { EntityManager } from '../core/entity-manager';
import { Agent } from '../entities/agent';
import { Commands } from '../commands';

export class AgentMover implements System {
  private _eventManager: Dispatcher<Commands>;
  private _entityManager: EntityManager;
  private _definitionManager: DefinitionManager;

  constructor(
    eventManager: Dispatcher<Commands>,
    entityManager: EntityManager,
    definitionManager: DefinitionManager
  ) {
    this._eventManager = eventManager;
    this._entityManager = entityManager;
    this._definitionManager = definitionManager;
  }

  update() {
    this.moveAgents();
  }

  private moveAgents() {
    const agents = this._entityManager.getAll<Agent>('AGENT');

    for (const agent of agents) {
      if (agent.currentAction) {
        agent.currentAction.remainingTurns--;
        if (agent.currentAction.remainingTurns === 0) {
          agent.regionId = agent.currentAction.payload.toRegion;
          delete agent.currentAction;
        }
      }
    }
  }
}
