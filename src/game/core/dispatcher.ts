// Narrows a Union type base on N

import { Command, Commands } from '../commands';
import { EntityManager } from './entity-manager';

// e.g. NarrowAction<MyActions, 'Example'> would produce ExampleAction
export type NarrowAction<T, N> = T extends { action: N } ? T : never;

export type Handler<T extends Commands = Commands> = (
  command: T,
  entityManager: EntityManager
) => void;

export type Handlers<T extends Commands> = {
  [k in T['action']]: Handler<NarrowAction<Commands, k>>;
};

export class Dispatcher<T extends Commands> {
  private handlers: Handlers<T>;
  private entityManager: EntityManager;

  constructor(handlers: Handlers<T>, entityManager: EntityManager) {
    this.handlers = handlers;
    this.entityManager = entityManager;
  }

  execute(command: T) {
    this.handlers[command['action'] as T['action']](
      command,
      this.entityManager
    );
  }
}
