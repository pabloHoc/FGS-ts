import { Command } from '.';
import { EntityId } from '../entities';

export interface CreateArmy extends Command {
  action: 'CREATE_ARMY';
  size: number;
  attack: number;
  defense: number;
  empireId: EntityId;
  regionId: EntityId;
}

export const createArmy = (
  size: number,
  attack: number,
  defense: number,
  empireId: EntityId,
  regionId: EntityId
): CreateArmy => ({
  action: 'CREATE_ARMY',
  size,
  attack,
  defense,
  empireId,
  regionId,
});
