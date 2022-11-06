import { Dispatcher } from '../core/dispatcher';
import { GameContext } from '../core/game-context';
import { Entities, Entity } from '../entities';
import { getScopeFrom, isScope, ScopeType } from '../scopes';
import { getCommand } from './command-map';

const isCommand = (key: ActionKey) => actionKeys.includes(key);

// ? Can we type nested scopes? Do we want to?

const actionKeys = ['set_owner'] as const; // where this should be?
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

// ! See type JSON

export const executeCommands = <T extends Entities>(
  actions: Actions,
  scope: T,
  scopeContext: ScopeContext,
  gameContext: GameContext,
  dispatcher: Dispatcher
) => {
  scopeContext.this = scope;
  console.log('here', actions);
  for (const k in actions) {
    const key = k as keyof Actions;
    if (isCommand(key)) {
      console.log('isCommand', key);
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
      } else {
        console.log('is not object', commandValue);
        if (isScopeContext(commandValue)) {
          console.log('is scope context', scopeContext);
          commandValue =
            scopeContext[commandValue.toLowerCase() as ScopeContextKey];
        }
      }
      // replace scope entities here

      dispatcher.execute(command(scopeContext.this, commandValue) as any);
    } else if (isScope(key)) {
      console.log('isScope', key, actions[key]);
      const newScope = getScopeFrom(key, scope, gameContext);
      scopeContext.prev = scope;
      executeCommands(
        actions[key],
        newScope,
        scopeContext,
        gameContext,
        dispatcher
      );
    }
  }
};
