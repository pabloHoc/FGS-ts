import { Command, Commands } from '../commands';
import { HANDLERS } from '../commands/handlers';

export type NarrowAction<T, N> = T extends { action: N } ? T : never;

export type Handler<T extends Command> = (command: T) => void;

export type Handlers = {
  [k in Commands['action']]: Handler<NarrowAction<Commands, k>>;
};

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
    // console.log(command);
    const handler = this.handlers[command['action'] as T['action']];
    if (handler) {
      const result = handler(command);
      if (this.callback) this.callback();
      return result;
    }
  }

  onCommandExecuted(callback: Function) {
    this.callback = callback;
  }
}
