import { Command } from '.';
import { EntityId } from '../entities';

export interface MoveAgent extends Command {
  action: 'MOVE_AGENT';
  agentId: EntityId;
  toRegionId: EntityId;
}

export const moveAgent = (
  agentId: EntityId,
  toRegionId: EntityId
): MoveAgent => ({
  action: 'MOVE_AGENT',
  agentId,
  toRegionId,
});
