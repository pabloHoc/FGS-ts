import { EventManager } from '../../core/event-manager';
import { Events } from '../events';
import { startTurn } from '../events/start-turn';
import { System } from '../systems';
import { AgentMover } from '../systems/agent-mover';
import { BuildingBuilder } from '../systems/building-builder';
import { ResourceProducer } from '../systems/resource-producer';
import { DefinitionManager } from './definition-manager';
import { EntityManager } from './entity-manager';
import { World } from './world';

export class Game {
  private _eventManager = new EventManager<Events>();
  private _entityManager = new EntityManager();
  private _definitionManager = new DefinitionManager();
  private _turn = 0;
  private _world = new World(this._entityManager, this._definitionManager);
  private _systems: System[] = [];

  constructor() {
    this._eventManager.listen('END_TURN', this.handleEndTurn);
    this._world.generateWorld();

    this.addSystems();

    this._eventManager.dispatch(startTurn());
  }

  // ? Should we have a system manager?

  addSystems() {
    this._systems.push(
      new ResourceProducer(
        this._eventManager,
        this._entityManager,
        this._definitionManager
      ),
      new BuildingBuilder(
        this._eventManager,
        this._entityManager,
        this._definitionManager
      ),
      new AgentMover(
        this._eventManager,
        this._entityManager,
        this._definitionManager
      )
    );
  }

  updateSystems() {
    for (const system of this._systems) {
      system.update();
    }
  }

  // Getters

  get events() {
    return this._eventManager;
  }

  get turn() {
    return this._turn;
  }

  get entities() {
    return this._entityManager;
  }

  get definitions() {
    return this._definitionManager;
  }

  // Event Handlers

  handleEndTurn = () => {
    this._turn++;
    this.updateSystems();
    this._eventManager.dispatch(startTurn());
  };
}
