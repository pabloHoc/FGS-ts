import { Command } from '.';
import { EntityId } from '../entities';

export interface ConquestRegion extends Command {
  action: 'CONQUEST_REGION';
  regionId: EntityId;
  empireId: EntityId;
}

export const conquestRegion = (regionId: EntityId, empireId: EntityId) => ({
  action: 'CONQUEST_REGION',
  regionId,
  empireId,
});
