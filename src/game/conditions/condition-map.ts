import { GameBlackboard } from '../core/blackboard';
import { Entity } from '../entities';
import { Empire } from '../entities/empire';
import { Land } from '../entities/land';
import { Region } from '../entities/region';
import { hasFood } from './empire/has-food';
import { isPlayer } from './empire/is-player';
import { isLandType } from './land/is-land-type';
import { hasEmpire } from './region/has-empire';

type ConditionsMap<B, T> = Record<
  string,
  (value: any) => (context: B, entity: T) => boolean
>;

const EMPIRE_CONDITIONS_MAP: ConditionsMap<GameBlackboard, Empire> = {
  is_player: isPlayer,
  has_food: hasFood,
};

const REGION_CONDITIONS_MAP: ConditionsMap<GameBlackboard, Region> = {
  has_empire: hasEmpire,
};

const LAND_CONDITIONS_MAP: ConditionsMap<GameBlackboard, Land> = {
  is_land_type: isLandType,
};

export const CONDITIONS_MAP = {
  ...REGION_CONDITIONS_MAP,
  ...EMPIRE_CONDITIONS_MAP,
  ...LAND_CONDITIONS_MAP,
};

// TODO: use handlers typed here
const map = handlers({
  is_player: isPlayer,
  has_food: hasFood,
  has_empire: hasEmpire,
  is_land_type: isLandType,
});

function handlers<H>(h: {
  [K in keyof H]: [
    (value?: any) => (context: GameBlackboard, entity: Entity) => boolean
  ] extends [H[K]]
    ? H[K]
    : never;
}): H {
  return h;
}

export type ConditionKey = keyof typeof map;

export const validateCondition = <
  B extends GameBlackboard,
  P extends Entity, //Parameters<typeof map[K]>[0],
  K extends ConditionKey
>(
  context: B,
  entity: P,
  key: K,
  value: never
) => map[key](value)(context, entity as never);
