import { Command } from '.';
import { EntityId } from '../entities';
import { RegionId } from '../entities/region';

export interface CreateLand extends Command {
  action: 'CREATE_LAND';
  name: string;
  regionId: RegionId;
}

export const createLand = (name: string, regionId: RegionId): CreateLand => ({
  action: 'CREATE_LAND',
  name,
  regionId,
});
