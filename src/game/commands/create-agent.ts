import { Command } from '.';
import { EntityId } from '../entities';

export interface CreateAgent extends Command {
  action: 'CREATE_AGENT';
  name: string;
  empireId: EntityId;
  regionId: EntityId;
}

export const createAgent = (
  name: string,
  empireId: EntityId,
  regionId: EntityId
): CreateAgent => ({
  action: 'CREATE_AGENT',
  name,
  empireId,
  regionId,
});
