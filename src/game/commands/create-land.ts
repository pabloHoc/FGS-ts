import { Command } from '.';
import { EntityId } from '../entities';

export interface CreateLand extends Command {
  action: 'CREATE_LAND';
  name: string;
  regionId: EntityId;
}

export const createLand = (name: string, regionId: EntityId): CreateLand => ({
  action: 'CREATE_LAND',
  name,
  regionId,
});
