import { Blackboard } from '../ai/blackboard';
import { Entity } from '../entities';

export type Condition<B extends Blackboard, T extends Entity> = (
  context: B,
  entity: T
) => boolean;
