import { Command } from '.';

export interface ProcessEmpireAIs extends Command {
  action: 'PROCESS_EMPIRE_AIS';
}

export const processEmpireAIs = (): ProcessEmpireAIs => ({
  action: 'PROCESS_EMPIRE_AIS',
});
