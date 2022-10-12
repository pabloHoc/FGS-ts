import { useContext, useEffect } from 'react';
import { NarrowAction } from '../../core/event-manager';
import { Events } from '../../game/events';
import { GameCtx } from '../context/GameCtx';

export const useListener = <K extends Events['type']>(
  eventType: K,
  listener: (event: NarrowAction<Events, K>) => void
) => {
  const game = useContext(GameCtx);

  useEffect(() => {
    game.events.listen(eventType, listener);

    return () => game.events.stopListening(eventType, listener);
  }, []);
};
