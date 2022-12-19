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
import { Player } from './player';

export type BaseEntityId = Brand<string, 'EntityID'>;

export type EntityId<T> = T & BaseEntityId; // TODO: fix Entity = EntityId
export interface Entity {
  id: BaseEntityId;
  type: Uppercase<EntityType>;
}

export type Entities =
  | Player
  | Empire
  | Region
  | Land
  | Agent
  | Army
  | BuildingQueueItem
  | ActionQueueItem
  | Modifier
  | Spell;

export type EntityType = Entities['type'];
