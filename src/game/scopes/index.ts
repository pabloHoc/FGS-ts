import { GameBlackboard } from '../core/game-blackboard';
import { GlobalGameBlackboard } from '../core/game-context';
import { Entity } from '../entities';
import { isAgent } from '../entities/agent';
import { isRegion } from '../entities/region';
import { getEmpireFromAgent, getRegionFromAgent } from './agent';
import { getAllRegionsFromContext } from './context';

export const scopeTypes = [
  'agent',
  'region',
  'all-regions',
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

export const getScopeFrom = <T extends Entity>(
  scope: ScopeType,
  from: T,
  context: GameBlackboard = GlobalGameBlackboard.instance
) => {
  if (scope.toUpperCase() === from.type) {
    return from;
  }
  if (scope === 'region') {
    if (isAgent(from)) {
      return getRegionFromAgent(from, context);
    }
  }
  if (scope === 'empire') {
    if (isAgent(from)) {
      return getEmpireFromAgent(from, context);
    }
  }
  if (scope === 'all-regions') {
    const regions = getAllRegionsFromContext(context);
    return regions;
  }
  throw Error('INVALID SCOPE PARAMS');
};
