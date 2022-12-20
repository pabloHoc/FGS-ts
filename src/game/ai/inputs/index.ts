import { GameBlackboard } from '../../core/game-blackboard';
import { Entity } from '../../entities';
import { Empire } from '../../entities/empire';
import { Region } from '../../entities/region';
import { grasslandNumberInput } from './grassland-number-input';
import { woodQtyInput } from './wood-qty-input';

type InputMap<B, T> = Record<string, (context: B, entity: T) => number>;

function inputs<H>(h: {
  [K in keyof H]: [
    (context: GameBlackboard, entity: Entity) => number
  ] extends [H[K]]
    ? H[K]
    : never;
}): H {
  return h;
}

const EMPIRE_INPUT_MAP: InputMap<GameBlackboard, Empire> = {
  wood: woodQtyInput,
} as const;

const REGION_INPUT_MAP: InputMap<GameBlackboard, Region> = {
  grassland: grasslandNumberInput,
} as const;

const map = inputs({
  ...EMPIRE_INPUT_MAP,
  ...REGION_INPUT_MAP,
});

type InputKey = keyof typeof map;

export const getInputValue = <
  B extends GameBlackboard,
  P extends Entity,
  K extends InputKey
>(
  context: B,
  entity: P,
  key: K
) => map[key](context, entity as never);
