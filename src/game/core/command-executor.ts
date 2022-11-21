// Narrows a Union type base on N

import { Command, Commands } from '../commands';
import { HANDLERS } from '../commands/handlers';
import { DefinitionManager } from './definition-manager';
import { GameContext } from './game-context';

export type NarrowAction<T, N> = T extends { action: N } ? T : never;

export type Handler<T extends Command> = (command: T) => void;

export type Handlers = {
  [k in Commands['action']]: Handler<NarrowAction<Commands, k>>;
};

// TODO: Change name
export class CommandExecutor {
  private static _instance: CommandExecutor;
  private handlers = HANDLERS;
  private callback: Function | undefined;

  static get instance() {
    if (!this._instance) {
      this._instance = new CommandExecutor();
    }
    return this._instance;
  }

  execute<T extends Commands>(command: NarrowAction<T, T['action']>) {
    console.log(command);
    const handler = this.handlers[command['action'] as T['action']];
    if (handler) {
      handler(command);
      if (this.callback) this.callback();
    }
  }

  onCommandExecuted(callback: Function) {
    this.callback = callback;
  }
}
