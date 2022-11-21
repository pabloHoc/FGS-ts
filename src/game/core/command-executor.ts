// Narrows a Union type base on N

import { Command, Commands } from '../commands';
import { DefinitionManager } from './definition-manager';
import { GameContext } from './game-context';

export type NarrowAction<T, N> = T extends { action: N } ? T : never;

export type Handler<T extends Command> = (
  command: T,
  gameContext: GameContext,
  commandExecutor: CommandExecutor
) => void;

export type Handlers = {
  [k in Commands['action']]: Handler<NarrowAction<Commands, k>>;
};

// TODO: Change name
export class CommandExecutor {
  private gameContext: GameContext;
  private handlers: Handlers;
  private callback: Function | undefined;

  constructor(handlers: Handlers, gameContext: GameContext) {
    this.handlers = handlers;
    this.gameContext = gameContext;
  }

  execute<T extends Commands>(command: NarrowAction<T, T['action']>) {
    console.log(command);
    const handler = this.handlers[command['action'] as T['action']];
    if (handler) {
      handler(command, this.gameContext, this);
      if (this.callback) this.callback();
    }
  }

  onCommandExecuted(callback: Function) {
    this.callback = callback;
  }
}
