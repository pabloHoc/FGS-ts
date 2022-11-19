import { createEmpire } from '../commands/create-empire';
import { HANDLERS } from '../commands/handlers';
import { DefinitionManager } from './definition-manager';
import { CommandExecutor } from './command-executor';
import { GameContext } from './game-context';
import { World } from './world';

export class Game {
  private _gameContext = new GameContext();
  private _definitionManager = new DefinitionManager();
  private _commandExecutor = new CommandExecutor(
    HANDLERS,
    this._gameContext,
    this._definitionManager
  );
  private _world = new World(
    this._gameContext,
    this._definitionManager,
    this._commandExecutor
  );

  constructor() {
    this._world.generateWorld();
    this._commandExecutor.execute(createEmpire('asd', false));
  }

  onCommandExecuted(callback: Function) {
    this._commandExecutor.onCommandExecuted(callback);
  }

  // Getters

  get commands() {
    return this._commandExecutor;
  }

  get context() {
    return this._gameContext;
  }

  get definitions() {
    return this._definitionManager;
  }
}
