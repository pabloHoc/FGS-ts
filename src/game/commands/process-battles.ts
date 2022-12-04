import { Command } from '.';

export interface ProcessBattles extends Command {
  action: 'PROCESS_BATTLES';
}

export const processBattles = (): ProcessBattles => ({
  action: 'PROCESS_BATTLES',
});
