import { isPlayer } from './empire/is-player';
import { hasEmpire } from './region/has-empire';
import { ConditionKey } from './validator';

type ConditionsMap<T> = { [k in ConditionKey]: (entity: T) => boolean };

/**
 * We probably need here to add a different condition map
 * for each entity type, and have a getConditionMap function
 * that returns the specific type
 */

const EMPIRE_CONDITIONS_MAP = {
  is_player: isPlayer,
};

const REGION_CONDITIONS_MAP = {
  has_empire: hasEmpire,
};

// ! any type here
export const CONDITIONS_MAP: ConditionsMap<any> = {
  ...REGION_CONDITIONS_MAP,
  ...EMPIRE_CONDITIONS_MAP,
};
