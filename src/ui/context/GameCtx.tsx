import { createContext, ReactElement, useContext } from 'react';
import { game } from '../../game';
import { UIState, UIStateCtx } from './UIStateCtx';

declare global {
  interface Window {
    game: any;
  }
}

window.game = game;

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
