import { createEmpire } from '../commands/create-empire';
import { HANDLERS } from '../commands/handlers';
import { DefinitionManager } from './definition-manager';
import { CommandExecutor } from './command-executor';
import { GlobalGameBlackboard } from './game-context';
import { World } from './world';

export class Game {
  private _world = new World();

  constructor() {
    this._world.generateWorld();
  }

  onCommandExecuted(callback: Function) {
    CommandExecutor.instance.onCommandExecuted(callback);
  }

  // Getters

  get commands() {
    return CommandExecutor.instance;
  }

  get context() {
    return GlobalGameBlackboard.instance;
  }

  get definitions() {
    return DefinitionManager.instance;
  }
}
