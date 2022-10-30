import { GameContext } from '../core/game-context';
import { Entities } from '../entities';
import { Agent } from '../entities/agent';
import { getScopeFrom, isScope, ScopeType } from '../scopes';
import { CONDITIONS_MAP } from './condition-map';

const isCondition = (key: ConditionKey) => conditionKeys.includes(key);
const getCondition = (key: ConditionKey) => CONDITIONS_MAP[key];

// ? Can we type nested scopes? Do we want to?

const conditionKeys = ['has_empire', 'is_player'] as const; // where this should be?
export type ConditionKey = typeof conditionKeys[number];

type Condition = {
  [key in ConditionKey]?: boolean | number | string;
};
type Scope = { [key in ScopeType]?: Condition | Scope };
export type Conditions = Scope | Condition;

export const validateConditions = <T extends Entities>(
  conditions: Conditions,
  scope: T,
  gameContext: GameContext
): boolean => {
  for (const k in conditions) {
    const key = k as keyof Conditions;
    if (isCondition(key)) {
      const condition = getCondition(key);
      const expectedValue = conditions[key]; // value is never because union of primitive types
      const actualValue = condition(scope);
      if (expectedValue !== actualValue) {
        return false;
      }
    } else if (isScope(key)) {
      const newScope = getScopeFrom(key, scope, gameContext);
      const result = validateConditions(conditions[key], newScope, gameContext);
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
