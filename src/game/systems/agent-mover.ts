import { System } from '.';
import { EventManager } from '../../core/event-manager';
import { DefinitionManager } from '../core/definition-manager';
import { EntityManager } from '../core/entity-manager';
import { Agent } from '../entities/agent';
import { Events } from '../events';
import { MoveAgent } from '../events/move-agent';

export class AgentMover implements System {
  private _eventManager: EventManager<Events>;
  private _entityManager: EntityManager;
  private _definitionManager: DefinitionManager;

  constructor(
    eventManager: EventManager<Events>,
    entityManager: EntityManager,
    definitionManager: DefinitionManager
  ) {
    this._eventManager = eventManager;
    this._entityManager = entityManager;
    this._definitionManager = definitionManager;

    this._eventManager.listen('MOVE_AGENT', this.handleAgentMoved);
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

  private handleAgentMoved = (event: MoveAgent) => {
    const agent = this._entityManager.get<Agent>('AGENT', event.agentId);
    agent.currentAction = {
      name: 'MOVE',
      payload: {
        fromRegion: agent.regionId,
        toRegion: event.toRegionId,
      },
      remainingTurns: 2,
    };
  };
}
