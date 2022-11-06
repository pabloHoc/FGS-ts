import { Brand } from '../helpers/types';
import { ActionQueueItem } from './action-queue-item';
import { Agent } from './agent';
import { BuildingQueueItem } from './building-queue-item';
import { Empire } from './empire';
import { Land } from './land';
import { Region } from './region';

// ? Do we want specific entity types id? e.g.: RegionId

export type EntityId = Brand<string, 'EntityID'>;

// ? should we have type here?
export interface Entity {
  id: EntityId;
  type: Uppercase<EntityType>;
}

export type Entities =
  | Empire
  | Region
  | Land
  | Agent
  | BuildingQueueItem
  | ActionQueueItem;

export type EntityType = Entities['type'];
