import { GameContext } from '../core/game-context';
import { Entities, Entity } from '../entities';
import { Agent } from '../entities/agent';
import { getScopeFrom, isScope, ScopeType } from '../scopes';
import { ConditionKey, CONDITIONS_MAP, useHandler } from './condition-map';

const isCondition = (key: ConditionKey) =>
  Object.keys(CONDITIONS_MAP).includes(key);

// TODO: check if we need nested scopes

type Condition = {
  [key in ConditionKey]?: boolean | number | string;
};
type Scope = { [key in ScopeType]?: Condition | Scope };
export type Conditions = Scope | Condition;

export const validateConditions = <T extends Entity>(
  conditions: Conditions,
  scope: T
): boolean => {
  for (const k in conditions) {
    const key = k as keyof Conditions;
    if (isCondition(key)) {
      const expectedValue = conditions[key]; // value is never because union of primitive types
      const actualValue = useHandler(scope, key);
      if (expectedValue !== actualValue) {
        return false;
      }
    } else if (isScope(key)) {
      const newScope = getScopeFrom(key, scope);
      const result = validateConditions(conditions[key], newScope);
      if (!result) {
        return false;
      }
    }
  }
  return true;
};

export const validateAgentActionConditions = (
  agent: Agent,
  conditions: any
) => {};
