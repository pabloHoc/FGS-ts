import { useContext, useEffect, useState } from 'react';
import { endTurn } from '../../game/commands/end-turn';
import { GameCtx } from '../context/GameCtx';

export const EndTurnButton = () => {
  const game = useContext(GameCtx);
  const [turn, setTurn] = useState(game.context.turn);

  // TODO: check if this is necesary
  // or we can use it directly
  useEffect(() => {
    setTurn(game.context.turn);
  }, []);

  const handleClick = () => {
    game.commands.execute(endTurn());
  };

  return (
    <div>
      <h3>TURN</h3>
      <p>Turn #{turn}</p>
      <button onClick={handleClick}>End Turn</button>
    </div>
  );
};
