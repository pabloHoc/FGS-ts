// Narrows a Union type base on N

import { Command, Commands } from '../commands';
import { DefinitionManager } from './definition-manager';
import { GameContext } from './game-context';

export type NarrowAction<T, N> = T extends { action: N } ? T : never;

export type Handler<T extends Command> = (
  command: T,
  gameContext: GameContext,
  definitionManager: DefinitionManager,
  dispatcher: Dispatcher
) => void;

export type Handlers = {
  [k in Commands['action']]: Handler<NarrowAction<Commands, k>>;
};

// TODO: Change name
export class Dispatcher {
  private gameContext: GameContext;
  private definitionManager: DefinitionManager;
  private handlers: Handlers;
  private callback: Function | undefined;

  constructor(
    handlers: Handlers,
    gameContext: GameContext,
    definitionManager: DefinitionManager
  ) {
    this.handlers = handlers;
    this.gameContext = gameContext;
    this.definitionManager = definitionManager;
  }

  execute<T extends Commands>(command: NarrowAction<T, T['action']>) {
    console.log(command);
    const handler = this.handlers[command['action'] as T['action']];
    if (handler) {
      handler(command, this.gameContext, this.definitionManager, this);
      if (this.callback) this.callback();
    }
  }

  onCommandExecuted(callback: Function) {
    this.callback = callback;
  }
}
