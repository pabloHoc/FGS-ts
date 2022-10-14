import { Command } from '.';
import { EntityId } from '../entities';

export interface SelectAgent extends Command {
  action: 'SELECT_AGENT';
  agentId: EntityId;
}

export const selectAgent = (agentId: EntityId): SelectAgent => ({
  action: 'SELECT_AGENT',
  agentId,
});
