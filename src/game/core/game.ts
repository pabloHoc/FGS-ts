import { createEmpire } from '../commands/create-empire';
import { HANDLERS } from '../commands/handlers';
import { DefinitionManager } from './definition-manager';
import { Dispatcher } from './dispatcher';
import { GameContext } from './game-context';
import { World } from './world';

export class Game {
  private _gameContext = new GameContext();
  private _definitionManager = new DefinitionManager();
  private _dispatcher = new Dispatcher(
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
    this._dispatcher.execute(createEmpire('asd', false));
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
}
