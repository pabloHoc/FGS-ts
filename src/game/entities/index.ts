import { Modifier } from './modifier';
import { Brand } from '../helpers/types';
import { ActionQueueItem } from './action-queue-item';
import { Agent } from './agent';
import { BuildingQueueItem } from './building-queue-item';
import { Empire } from './empire';
import { Land } from './land';
import { Region } from './region';
import { Spell } from './spell';
import { Army } from './army';

// TODO: check if we want specific entity types id? e.g.: RegionId

export type EntityId = Brand<string, 'EntityID'>;

export interface Entity {
  id: EntityId;
  type: Uppercase<EntityType>;
}

export type Entities =
  | Empire
  | Region
  | Land
  | Agent
  | Army
  // TODO: These are not entities, we need a new category
  | BuildingQueueItem
  | ActionQueueItem
  | Modifier
  | Spell;

export type EntityType = Entities['type'];
