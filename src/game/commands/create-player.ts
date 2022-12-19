import { Command } from '.';
import { EmpireId } from '../entities/empire';

export interface CreatePlayer extends Command {
  action: 'CREATE_PLAYER';
  name: string;
  empireId: EmpireId;
  isAI: boolean;
}

export const createPlayer = (
  name: string,
  empireId: EmpireId,
  isAI: boolean
): CreatePlayer => ({
  action: 'CREATE_PLAYER',
  name,
  empireId,
  isAI,
});
