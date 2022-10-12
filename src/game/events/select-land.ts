import { GameEvent } from '../../core/event-manager';
import { EntityId } from '../entities';

export interface SelectLand extends GameEvent {
  type: 'SELECT_LAND';
  landId: EntityId;
}

export const selectLand = (landId: EntityId): SelectLand => ({
  type: 'SELECT_LAND',
  landId,
});
