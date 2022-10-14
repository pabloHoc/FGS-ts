import { GameEvent } from '../../core/event-manager';
import { EntityId } from '../entities';

export interface SelectAgent extends GameEvent {
  type: 'SELECT_AGENT';
  agentId: EntityId;
}

export const selectAgent = (agentId: EntityId): SelectAgent => ({
  type: 'SELECT_AGENT',
  agentId,
});
