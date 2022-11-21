import { createEmpire } from '../commands/create-empire';
import { HANDLERS } from '../commands/handlers';
import { DefinitionManager } from './definition-manager';
import { CommandExecutor } from './command-executor';
import { GameContext } from './game-context';
import { World } from './world';

export class Game {
  private _world = new World();

  constructor() {
    this._world.generateWorld();
    CommandExecutor.instance.execute(createEmpire('asd', false));
  }

  onCommandExecuted(callback: Function) {
    CommandExecutor.instance.onCommandExecuted(callback);
  }

  // Getters

  get commands() {
    return CommandExecutor.instance;
  }

  get context() {
    return GameContext.instance;
  }

  get definitions() {
    return DefinitionManager.instance;
  }
}
