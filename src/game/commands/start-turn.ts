import { Command } from '.';

/**
 * Event to be used at the start of the turn,
 * when the previous turn finished being processed
 */
export interface StartTurn extends Command {
  action: 'START_TURN';
}

export const startTurn = (): StartTurn => ({
  action: 'START_TURN',
});
