import { Commands } from '../commands';
import { createEmpire } from '../commands/create-empire';
import { moveAgent } from '../commands/move-agent';
import { startTurn } from '../commands/start-turn';
import { HANDLERS } from '../commands/handlers';
import { System } from '../systems';
import { AgentMover } from '../systems/agent-mover';
import { ResourceProducer } from '../systems/resource-producer';
import { DefinitionManager } from './definition-manager';
import { Dispatcher } from './dispatcher';
import { GameContext } from './game-context';
import { World } from './world';

export class Game {
  private _gameContext = new GameContext();
  private _definitionManager = new DefinitionManager();
  private _systems: System[] = [];
  private _dispatcher = new Dispatcher<Commands>(
    HANDLERS,
    this._gameContext,
    this._definitionManager
  );
  private _world = new World(
    this._gameContext,
    this._definitionManager,
    this._dispatcher
  );

  constructor() {
    this._world.generateWorld();
    this.addSystems();
    this._dispatcher.execute(createEmpire('asd', false));
  }

  // ? Should we have a system manager?
  // We could have this logic in commands, and execute commands
  // each turn (easy to debug, can trigger systems via console)
  addSystems() {
    this._systems.push(
      new ResourceProducer(
        this._dispatcher,
        this._gameContext,
        this._definitionManager
      ),
      new AgentMover(
        this._dispatcher,
        this._gameContext,
        this._definitionManager
      )
    );
  }

  updateSystems() {
    for (const system of this._systems) {
      system.update();
    }
  }

  onCommandExecuted(callback: Function) {
    this._dispatcher.onCommandExecuted(callback);
  }

  // Getters

  get commands() {
    return this._dispatcher;
  }

  get context() {
    return this._gameContext;
  }

  get definitions() {
    return this._definitionManager;
  }

  // Event Handlers

  handleEndTurn = () => {
    this.updateSystems();
    this._dispatcher.execute(startTurn());
  };
}
