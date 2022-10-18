// Narrows a Union type base on N

import { Command, Commands } from '../commands';
import { DefinitionManager } from './definition-manager';
import { GameContext } from './game-context';

export type NarrowAction<T, N> = T extends { action: N } ? T : never;

export type Handler<T extends Command> = (
  command: T,
  gameContext: GameContext,
  definitionManager: DefinitionManager
) => void;

export type Handlers<T extends Commands> = {
  [k in T['action']]: Handler<NarrowAction<T, k>>;
};

// TODO: Change name
export class Dispatcher<T extends Commands> {
  private gameContext: GameContext;
  private definitionManager: DefinitionManager;
  private handlers: Handlers<T>;
  private callback: Function | undefined;

  constructor(
    handlers: Handlers<T>,
    gameContext: GameContext,
    definitionManager: DefinitionManager
  ) {
    this.handlers = handlers;
    this.gameContext = gameContext;
    this.definitionManager = definitionManager;
  }

  execute(command: NarrowAction<T, T['action']>) {
    const handler = this.handlers[command['action'] as T['action']];
    if (handler) {
      handler(command, this.gameContext, this.definitionManager);
      if (this.callback) this.callback();
    }
  }

  onCommandExecuted(callback: Function) {
    this.callback = callback;
  }
}
