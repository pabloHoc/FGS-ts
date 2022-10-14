import { Brand } from '../helpers/types';
import { Agent } from './agent';
import { Empire } from './empire';
import { Land } from './land';
import { Region } from './region';

// ? Do we want specific entity types id? e.g.: RegionId

export type EntityId = Brand<string, 'EntityID'>;

// ? should we have type here?

export interface Entity {
  id: EntityId;
}

export type Entities = Empire | Region | Land | Agent;
