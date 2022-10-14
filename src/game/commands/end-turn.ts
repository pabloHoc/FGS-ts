import { Command } from '.';

/**
 * Event to be used at the end of the turn,
 * to start processing and computing everything for
 * the nex turn
 */
export interface EndTurn extends Command {
  action: 'END_TURN';
}

export const endTurn = (): EndTurn => ({
  action: 'END_TURN',
});
