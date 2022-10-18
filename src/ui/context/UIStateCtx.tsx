import { createContext, ReactElement, useEffect, useState } from 'react';
import { EntityId } from '../../game/entities';

export interface UIState {
  selectedAgentId?: EntityId;
  selectedRegionId?: EntityId;
  selectedLandId?: EntityId;
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

  return (
    <UIStateCtx.Provider value={{ uiState, setUIState }}>
      {children}
    </UIStateCtx.Provider>
  );
};
