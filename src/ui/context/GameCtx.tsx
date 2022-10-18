import {
  createContext,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { game } from '../../game';

declare global {
  interface Window {
    game: any;
  }
}

window.game = game;

export const GameCtx = createContext(game);

export const GameCtxProvider = ({ children }: { children: ReactElement }) => {
  const [, updateState] = useState<{}>();
  const forceUpdate = useCallback(() => updateState({}), []);

  useEffect(() => {
    game.onCommandExecuted(forceUpdate);
  });

  return <GameCtx.Provider value={game}>{children}</GameCtx.Provider>;
};
