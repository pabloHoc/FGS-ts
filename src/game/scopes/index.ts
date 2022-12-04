import { GlobalGameBlackboard } from '../core/game-context';
import { Entity } from '../entities';
import { isAgent } from '../entities/agent';
import { isRegion } from '../entities/region';
import { getEmpireFromAgent, getRegionFromAgent } from './agent';

export const scopeTypes = [
  'agent',
  'region',
  'empire',
  'land',
  'this',
  'root',
  'owner',
  'prev',
] as const;
export type ScopeType = typeof scopeTypes[number];

export const isScope = (key: ScopeType) => scopeTypes.includes(key);

const scopesMap = {
  AGENT: {
    REGION: getRegionFromAgent,
    EMPIRE: getEmpireFromAgent,
  },
};

// TODO: IMPROVE THIS

export const getScopeFrom = <T extends Entity>(scope: ScopeType, from: T) => {
  if (scope.toUpperCase() === from.type) {
    return from;
  }
  if (scope === 'region') {
    if (isAgent(from)) {
      return getRegionFromAgent(from);
    }
  }
  if (scope === 'empire') {
    if (isAgent(from)) {
      return getEmpireFromAgent(from);
    }
  }
  throw Error('INVALID SCOPE PARAMS');
};
