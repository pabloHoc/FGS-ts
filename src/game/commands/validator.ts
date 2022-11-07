import { Dispatcher } from '../core/dispatcher';
import { GameContext } from '../core/game-context';
import { Entities, Entity } from '../entities';
import { getScopeFrom, isScope, ScopeType } from '../scopes';
import { getCommand } from './command-map';

const isCommand = (key: ActionKey) => actionKeys.includes(key);

// ? Can we type nested scopes? Do we want to?

const actionKeys = ['set_owner', 'set_location'] as const; // where this should be?
export type ActionKey = typeof actionKeys[number];

type ActionObj = {
  [key in ActionKey]?: boolean | number | string | ScopeType;
};
type Scope = { [key in ScopeType]?: ActionObj | Scope };
export type Actions = Scope | ActionObj;

type ScopeContext = {
  root: Entity;
  this: Entity;
  prev: Entity | undefined;
};

type ScopeContextKey = keyof ScopeContext;

const isScopeContext = (key: string): key is ScopeContextKey => {
  return ['root', 'this', 'prev'].includes(key.toLowerCase());
};

const isPayload = (key: string) => key.startsWith('@');

// ! See type JSON

export const executeCommands = <T extends Entities>(
  actions: Actions,
  scope: T,
  scopeContext: ScopeContext,
  gameContext: GameContext,
  dispatcher: Dispatcher,
  payload?: object
) => {
  scopeContext.this = scope;
  for (const k in actions) {
    const key = k as keyof Actions;
    if (isCommand(key)) {
      const command = getCommand(key);
      let commandValue: any = actions[key]; // could be flat or nested object, primitive, target entity or effects

      // We could do this recursively
      if (typeof commandValue === 'object') {
        for (const key in commandValue) {
          const value = commandValue[key];
          if (isScopeContext(value)) {
            commandValue[key] = scopeContext[value];
          }
        }
      } else if (payload && isPayload(commandValue)) {
        commandValue = payload[commandValue.substring(1) as never];
      } else {
        if (isScopeContext(commandValue)) {
          commandValue =
            scopeContext[commandValue.toLowerCase() as ScopeContextKey];
        }
      }

      dispatcher.execute(command(scopeContext.this, commandValue) as any);
    } else if (isScope(key)) {
      const newScope = getScopeFrom(key, scope, gameContext);
      scopeContext.prev = scope;
      executeCommands(
        actions[key],
        newScope,
        scopeContext,
        gameContext,
        dispatcher,
        payload
      );
    }
  }
};
