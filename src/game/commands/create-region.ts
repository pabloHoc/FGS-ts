import { Command } from '.';
import { EntityId } from '../entities';

export interface CreateRegion extends Command {
  action: 'CREATE_REGION';
  name: string;
  empireId?: EntityId;
}

export const createRegion = (
  name: string,
  empireId?: EntityId
): CreateRegion => ({
  action: 'CREATE_REGION',
  name,
  empireId,
});
