import { Command } from '.';
import { EntityId } from '../entities';
import { EmpireId } from '../entities/empire';

export interface CreateRegion extends Command {
  action: 'CREATE_REGION';
  name: string;
  empireId?: EmpireId;
}

export const createRegion = (
  name: string,
  empireId?: EmpireId
): CreateRegion => ({
  action: 'CREATE_REGION',
  name,
  empireId,
});
