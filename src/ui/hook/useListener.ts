import { useContext, useEffect } from 'react';
import { NarrowAction } from '../../game/core/dispatcher';
import { Commands } from '../../game/commands';
import { GameCtx } from '../context/GameCtx';

export const useListener = <K extends Commands['type']>(
  eventType: K,
  listener: (event: NarrowAction<Commands, K>) => void
) => {
  const game = useContext(GameCtx);

  useEffect(() => {
    game.events.listen(eventType, listener);

    return () => game.events.stopListening(eventType, listener);
  }, []);
};
