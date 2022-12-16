import { createContext, ReactElement, useContext } from 'react';
import { game } from '../../game';
import { Pathfinder } from '../../game/core/pathfinding';
import { Region } from '../../game/entities/region';
import { UIState, UIStateCtx } from './UIStateCtx';

declare global {
  interface Window {
    game: any;
    pathfinder: any;
  }
}

window.game = game;
window.pathfinder = new Pathfinder(
  game.context
    .getAllEntities<Region>('REGION')
    .map((region) => ({ ...region, f: 0, g: 0, h: 0 }))
);

export const GameCtx = createContext(game);

export const GameCtxProvider = ({
  children,
}: {
  children: ReactElement | ReactElement[];
}) => {
  const { setUIState } = useContext(UIStateCtx);

  game.onCommandExecuted(() =>
    setUIState((prevState: UIState) => ({ ...prevState }))
  );

  return <GameCtx.Provider value={game}>{children}</GameCtx.Provider>;
};
