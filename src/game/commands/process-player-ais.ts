import { Command } from '.';

export interface ProcessPlayerAIs extends Command {
  action: 'PROCESS_PLAYER_AIS';
}

export const processEmpireAIs = (): ProcessPlayerAIs => ({
  action: 'PROCESS_PLAYER_AIS',
});
