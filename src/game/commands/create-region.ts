import { Command } from '.';
import { EntityId } from '../entities';
import { EmpireId } from '../entities/empire';

export interface CreateRegion extends Command {
  action: 'CREATE_REGION';
  name: string;
  empireId?: EmpireId;
  x: number;
  y: number;
}

export const createRegion = (
  name: string,
  x: number,
  y: number,
  empireId?: EmpireId
): CreateRegion => ({
  action: 'CREATE_REGION',
  name,
  empireId,
  x,
  y,
});
