import { Command } from '.';
import { EntityId } from '../entities';
import { EmpireId } from '../entities/empire';
import { RegionId } from '../entities/region';

export interface CreateArmy extends Command {
  action: 'CREATE_ARMY';
  size: number;
  attack: number;
  defense: number;
  empireId: EmpireId;
  regionId: RegionId;
}

export const createArmy = (
  size: number,
  attack: number,
  defense: number,
  empireId: EmpireId,
  regionId: RegionId
): CreateArmy => ({
  action: 'CREATE_ARMY',
  size,
  attack,
  defense,
  empireId,
  regionId,
});
