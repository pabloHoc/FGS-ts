import { GlobalGameBlackboard } from '../core/game-context';
import { Entity } from '../entities';
import { Agent } from '../entities/agent';
import { getScopeFrom, isScope, ScopeType } from '../scopes';
import {
  ConditionKey,
  CONDITIONS_MAP,
  validateCondition,
} from './condition-map';

const isCondition = (key: ConditionKey) =>
  Object.keys(CONDITIONS_MAP).includes(key);

// TODO: check if we need nested scopes

type Condition = {
  [key in ConditionKey]?: boolean | number | string;
};
type Scope = { [key in ScopeType]?: Condition | Scope };
export type Conditions = Omit<Scope, 'all-regions'> | Condition;

// TODO: add custom blackboard as param
export const validateConditions = <T extends Entity>(
  conditions: Conditions,
  scope: T
): boolean => {
  for (const k in conditions) {
    const key = k as keyof Conditions;
    if (isCondition(key)) {
      const value = conditions[key]; // value is never because union of primitive types
      const result = validateCondition(
        GlobalGameBlackboard.instance,
        scope,
        key,
        value
      );
      if (result === false) {
        return false;
      }
    } else if (isScope(key)) {
      const newScope = getScopeFrom(key, scope);
      if (!('length' in newScope)) {
        // TODO: check what to do with multiple results scope
        const result = validateConditions(conditions[key], newScope);
        if (!result) {
          return false;
        }
      }
    } else {
      throw Error(`INVALID CONDITION KEY ${key}`);
    }
  }
  return true;
};

export const validateAgentActionConditions = (
  agent: Agent,
  conditions: any
) => {};
