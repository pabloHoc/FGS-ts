import { GameEvent } from '../../core/event-manager';
import { EntityId } from '../entities';

export interface SelectRegion extends GameEvent {
  type: 'SELECT_REGION';
  regionId: EntityId;
}

export const selectRegion = (regionId: EntityId): SelectRegion => ({
  type: 'SELECT_REGION',
  regionId,
});
