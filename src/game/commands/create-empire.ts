import { Command } from '.';

export interface CreateEmpire extends Command {
  action: 'CREATE_EMPIRE';
  name: string;
}

export const createEmpire = (name: string): CreateEmpire => ({
  action: 'CREATE_EMPIRE',
  name,
});
