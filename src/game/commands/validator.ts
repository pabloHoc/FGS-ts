import { CommandExecutor } from '../core/command-executor';
import { GameContext } from '../core/game-context';
import { createModifier, ModifierType } from '../entities/modifier';
import { Entities, Entity } from '../entities';
import { Agent } from '../entities/agent';
import { Empire } from '../entities/empire';
import { Land } from '../entities/land';
import { Region } from '../entities/region';
import { getScopeFrom, isScope, ScopeType } from '../scopes';
import { ActionKey, COMMANDS, getCommand } from './command-map';

// ? Can we type nested scopes? Do we want to?

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

const isCommand = (key: ActionKey) => Object.keys(COMMANDS).includes(key);

const isPayload = (key: string) => key.startsWith('@');

const isModifiers = (key: string) => key === 'modifiers';

const isModifier = (key: string) =>
  ['add', 'mult'].includes(key.split('_')[key.split('_').length - 1]);
// ! See type JSON

export const executeCommands = <T extends Empire | Region | Land | Agent>(
  actions: Actions,
  scope: T,
  scopeContext: ScopeContext,
  gameContext: GameContext,
  commandExecutor: CommandExecutor,
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

      commandExecutor.execute(command(scopeContext.this, commandValue) as any);
    } else if (isModifiers(key)) {
      executeCommands(
        actions[key],
        scope,
        scopeContext,
        gameContext,
        commandExecutor,
        payload
      );
    } else if (isScope(key)) {
      const newScope = getScopeFrom(key, scope, gameContext);
      scopeContext.prev = scope;
      executeCommands(
        actions[key],
        newScope,
        scopeContext,
        gameContext,
        commandExecutor,
        payload
      );
    } else {
      // Here we are in a modifier, but this is not a safe assumption
      const modifierParts = (key as string).split('_');

      const name = modifierParts.slice(0, modifierParts.length - 1).join('_');
      const type = modifierParts[modifierParts.length - 1] as ModifierType;
      const value = actions[key];

      gameContext.addEntity(createModifier(name, type, value, scope.id));
    }
  }
};
