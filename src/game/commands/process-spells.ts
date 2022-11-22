import { Command } from '.';

export interface ProcessSpells extends Command {
  action: 'PROCESS_SPELLS';
}

export const processSpells = (): ProcessSpells => ({
  action: 'PROCESS_SPELLS',
});
