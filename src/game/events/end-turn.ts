import { GameEvent } from '../../core/event-manager';

/**
 * Event to be used at the end of the turn,
 * to start processing and computing everything for
 * the nex turn
 */
export interface EndTurn extends GameEvent {
  type: 'END_TURN';
}

export const endTurn = (): EndTurn => ({
  type: 'END_TURN',
});
