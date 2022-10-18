import { Command } from '.';

/**
 * Event to be used at the start of the turn,
 * when the previous turn finished being processed
 */
export interface EndTurn extends Command {
  action: 'END_TURN';
}

export const endTurn = (): EndTurn => ({
  action: 'END_TURN',
});
