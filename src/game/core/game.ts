import { EventManager } from '../../core/event-manager';
import { Empire } from '../entities/empire';
import { Land } from '../entities/land';
import { Region } from '../entities/region';
import { Events } from '../events';
import { startTurn } from '../events/start-turn';
import { System } from '../systems';
import { BuildingBuilder } from '../systems/building-builder';
import { ResourceProducer } from '../systems/resource-producer';
import { EntityManager } from './entity-manager';
import { World } from './world';

export class Game {
  private _eventManager = new EventManager<Events>();
  private _entityManager = new EntityManager();
  private _turn = 0;
  private _world = new World(this._entityManager);
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
      new ResourceProducer(this._eventManager, this._entityManager),
      new BuildingBuilder(this._eventManager, this._entityManager)
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
    return {
      lands: this._entityManager.getAll<Land>('LAND'),
      regions: this._entityManager.getAll<Region>('REGION'),
      empires: this._entityManager.getAll<Empire>('EMPIRE'),
    };
  }

  // Event Handlers

  handleEndTurn = () => {
    this._turn++;
    this.updateSystems();
    this._eventManager.dispatch(startTurn());
  };
}
