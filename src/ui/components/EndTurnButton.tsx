import { useContext, useEffect, useState } from 'react';
import { endTurn } from '../../game/commands/end-turn';
import { GameCtx } from '../context/GameCtx';
import { UIStateCtx } from '../context/UIStateCtx';

export const EndTurnButton = () => {
  const game = useContext(GameCtx);
  useContext(UIStateCtx);

  const handleClick = () => {
    game.commands.execute(endTurn());
  };

  return (
    <div>
      <h3>TURN</h3>
      <p>Turn #{game.context.turn}</p>
      <button onClick={handleClick}>End Turn</button>
    </div>
  );
};
