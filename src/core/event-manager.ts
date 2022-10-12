// Narrows a Union type base on N
// e.g. NarrowAction<MyActions, 'Example'> would produce ExampleAction
export type NarrowAction<T, N> = T extends { type: N } ? T : never;

export type Listener<T extends GameEvent, U extends T['type']> = (
  event: NarrowAction<T, U>
) => void;

export interface GameEvent {
  type: string;
}

// Do we really need to make it generic?

export class EventManager<T extends GameEvent> {
  private listeners: Map<T['type'], Listener<T, T['type']>[]> = new Map();

  listen<K extends T['type']>(
    eventType: K,
    listener: (event: NarrowAction<T, K>) => void
  ) {
    const listeners = this.listeners.get(eventType);

    // TODO: fix this horrible hacks

    if (!listeners) {
      this.listeners.set(eventType, [
        listener as unknown as Listener<T, T['type']>,
      ]);
      return;
    }

    // * We could add some priority order here if needed

    if (!listeners.includes(listener as unknown as Listener<T, T['type']>)) {
      listeners.push(listener as unknown as Listener<T, T['type']>);
    }
  }

  stopListening<K extends T['type']>(
    eventType: K,
    listener: (event: NarrowAction<T, K>) => void
  ) {
    const listeners = this.listeners.get(eventType);

    if (listeners?.includes(listener as unknown as Listener<T, T['type']>)) {
      const index = listeners.indexOf(
        listener as unknown as Listener<T, T['type']>
      );
      listeners.splice(index, 1);
    }
  }

  dispatch<U extends T>(event: NarrowAction<T, U['type']>) {
    const listeners = this.listeners.get(event['type']);

    console.log('EVENT DISPATCHED', event);

    if (!listeners) {
      return;
    }

    /**
     * * Instead of calling listeners directly, we could queue
     * * events as effects and dispatch them together
     * */

    for (const listener of listeners) {
      listener(event);
    }
  }
}
