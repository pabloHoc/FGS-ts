import { useContext, useEffect, useState } from 'react';
import { endTurn } from '../../game/commands/end-turn';
import { GameCtx } from '../context/GameCtx';
import { useListener } from '../hook/useListener';

export const EndTurnButton = () => {
  const game = useContext(GameCtx);
  const [turn, setTurn] = useState(game.turn);

  const handleTurnStarted = () => {
    setTurn(game.turn);
  };

  useListener('START_TURN', handleTurnStarted);

  const handleClick = () => {
    game.events.dispatch(endTurn());
  };

  return (
    <div>
      <h3>TURN</h3>
      <p>Turn #{turn}</p>
      <button onClick={handleClick}>End Turn</button>
    </div>
  );
};
