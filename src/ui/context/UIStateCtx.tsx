import { createContext, ReactElement, useEffect, useState } from 'react';
import { game } from '../../game';
import { EntityId } from '../../game/entities';

export interface UIState {
  selected_agent_id?: EntityId;
  selected_region_id?: EntityId;
  selected_land_id?: EntityId;
}

interface ContextProps {
  uiState: UIState;
  setUIState: Function;
}

export const UIStateCtx = createContext<ContextProps>({
  uiState: {},
  setUIState: () => null,
});

export const UIStateCtxProvider = ({
  children,
}: {
  children: ReactElement | ReactElement[];
}) => {
  const [uiState, setUIState] = useState<UIState>({});

  useEffect(() => {
    for (const key in uiState) {
      game.context.setVariable(key, uiState[key as never]);
    }
  }, [uiState]);

  return (
    <UIStateCtx.Provider value={{ uiState, setUIState }}>
      {children}
    </UIStateCtx.Provider>
  );
};
