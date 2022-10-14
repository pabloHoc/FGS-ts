import { GameEvent } from '../../core/event-manager';
import { EntityId } from '../entities';

export interface MoveAgent extends GameEvent {
  type: 'MOVE_AGENT';
  agentId: EntityId;
  toRegionId: EntityId;
}

export const moveAgent = (
  agentId: EntityId,
  toRegionId: EntityId
): MoveAgent => ({
  type: 'MOVE_AGENT',
  agentId,
  toRegionId,
});
