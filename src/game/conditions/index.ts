import { Entity } from '../entities';

export type Condition<T extends Entity> = (entity: T) => boolean;
