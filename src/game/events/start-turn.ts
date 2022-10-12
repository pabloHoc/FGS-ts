import { GameEvent } from '../../core/event-manager';

/**
 * Event to be used at the start of the turn,
 * when the previous turn finished being processed
 */
export interface StartTurn extends GameEvent {
  type: 'START_TURN';
}

export const startTurn = (): StartTurn => ({
  type: 'START_TURN',
});
