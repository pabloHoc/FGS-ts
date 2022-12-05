import { Entity, EntityId } from '.';
import { generateId } from '../helpers/id';
import { EmpireId } from './empire';
import { RegionId } from './region';

export type ArmyId = EntityId<Army>;

export interface Army extends Entity {
  type: 'ARMY';
  id: ArmyId;
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
): Army => ({
  id: generateId(),
  type: 'ARMY',
  size,
  attack,
  defense,
  empireId,
  regionId,
});
