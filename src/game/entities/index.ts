import { Brand } from '../helpers/types';
import { Agent } from './agent';
import { BuildingQueueItem } from './building-queue-item';
import { Empire } from './empire';
import { Land } from './land';
import { Region } from './region';

// ? Do we want specific entity types id? e.g.: RegionId

export type EntityId = Brand<string, 'EntityID'>;

// ? should we have type here?
export const entityTypes = [
  'agent',
  'region',
  'empire',
  'land',
  'building_queue_item',
] as const;
export type EntityType = typeof entityTypes[number];

export interface Entity {
  id: EntityId;
  type: Uppercase<EntityType>;
}

export type Entities = Empire | Region | Land | Agent | BuildingQueueItem;
