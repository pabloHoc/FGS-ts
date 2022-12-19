import { Entity, EntityId } from '.';
import { AI } from '../ai/ai';
import { generateId } from '../helpers/id';
import { EmpireId } from './empire';
export type PlayerId = EntityId<Player>;

export interface Player extends Entity {
  type: 'PLAYER';
  id: PlayerId;
  name: string;
  empireId: EmpireId;
  isAi: boolean;
  ai?: AI; // TODO: this breaks the contract that entity should be simple objects only
}

export const createPlayer = (
  name: string,
  empireId: EmpireId,
  isAi: boolean
): Player => ({
  id: generateId(),
  type: 'PLAYER',
  name,
  empireId,
  isAi,
  ai: isAi ? new AI(empireId) : undefined,
});
