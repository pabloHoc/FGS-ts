import { Command } from '.';
import { EntityId } from '../entities';

export interface SelectLand extends Command {
  action: 'SELECT_LAND';
  landId: EntityId;
}

export const selectLand = (landId: EntityId): SelectLand => ({
  action: 'SELECT_LAND',
  landId,
});
