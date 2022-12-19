import { Blackboard } from '../utility-ai/blackboard';
import { Entity } from '../entities';

export type Condition<B extends Blackboard, T extends Entity> = (
  context: B,
  entity: T,
  value?: any // TODO: this should be string | number
) => boolean;
