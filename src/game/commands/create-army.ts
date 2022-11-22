import { Command } from '.';
import { EntityId } from '../entities';

export interface CreateArmy extends Command {
  action: 'CREATE_ARMY';
  size: number;
  empireId: EntityId;
  regionId: EntityId;
}

export const createArmy = (
  size: number,
  empireId: EntityId,
  regionId: EntityId
): CreateArmy => ({
  action: 'CREATE_ARMY',
  size,
  empireId,
  regionId,
});
