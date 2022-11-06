import { Entity } from '../entities';
import { Empire } from '../entities/empire';
import { Region } from '../entities/region';
import { isPlayer } from './empire/is-player';
import { hasEmpire } from './region/has-empire';

type ConditionsMap<T> = { [k: string]: (entity: T) => boolean };

const EMPIRE_CONDITIONS_MAP: ConditionsMap<Empire> = {
  is_player: isPlayer,
};

const REGION_CONDITIONS_MAP: ConditionsMap<Region> = {
  has_empire: hasEmpire,
};

export const CONDITIONS_MAP = {
  ...REGION_CONDITIONS_MAP,
  ...EMPIRE_CONDITIONS_MAP,
};

// ==================================

const map = handlers({
  is_player: isPlayer,
  has_empire: hasEmpire,
});

function handlers<H>(h: {
  [K in keyof H]: [(entity: Entity) => boolean] extends [H[K]] ? H[K] : never;
}): H {
  return h;
}

export type ConditionKey = keyof typeof map;

export const useHandler = <
  P extends Entity, //Parameters<typeof map[K]>[0],
  K extends ConditionKey
>(
  entity: P,
  key: K
) => map[key](entity as never);
