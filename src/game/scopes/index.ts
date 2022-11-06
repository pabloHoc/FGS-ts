import { GameContext } from '../core/game-context';
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

// Add owner scope

// TODO: IMPROVE THIS

export const getScopeFrom = <T extends Entity>(
  scope: ScopeType,
  from: T,
  gameContext: GameContext
) => {
  if (scope === 'region') {
    if (isAgent(from)) {
      return getRegionFromAgent(from, gameContext);
    }
    if (isRegion(from)) return from;
  }
  if (scope === 'empire') {
    if (isAgent(from)) {
      return getEmpireFromAgent(from, gameContext);
    }
  }
  if (scope === 'agent') {
    if (isAgent(from)) {
      return from;
    }
  }
  throw Error('INVALID SCOPE PARAMS');
};
