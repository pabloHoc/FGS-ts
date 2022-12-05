import { Command } from '.';
import { EntityId } from '../entities';
import { EmpireId } from '../entities/empire';
import { RegionId } from '../entities/region';

export interface CreateAgent extends Command {
  action: 'CREATE_AGENT';
  name: string;
  empireId: EmpireId;
  regionId: RegionId;
}

export const createAgent = (
  name: string,
  empireId: EmpireId,
  regionId: RegionId
): CreateAgent => ({
  action: 'CREATE_AGENT',
  name,
  empireId,
  regionId,
});
