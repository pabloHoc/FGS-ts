import { Command } from '.';

export interface CreateEmpire extends Command {
  action: 'CREATE_EMPIRE';
  name: string;
  isPlayer: boolean;
}

export const createEmpire = (
  name: string,
  isPlayer: boolean
): CreateEmpire => ({
  action: 'CREATE_EMPIRE',
  name,
  isPlayer,
});
