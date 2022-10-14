import { Command } from '.';
import { EntityId } from '../entities';

export interface SelectRegion extends Command {
  action: 'SELECT_REGION';
  regionId: EntityId;
}

export const selectRegion = (regionId: EntityId): SelectRegion => ({
  action: 'SELECT_REGION',
  regionId,
});
