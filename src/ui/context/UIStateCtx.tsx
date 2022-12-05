import { createContext, ReactElement, useEffect, useState } from 'react';
import { game } from '../../game';
import { AgentId } from '../../game/entities/agent';
import { ArmyId } from '../../game/entities/army';
import { LandId } from '../../game/entities/land';
import { RegionId } from '../../game/entities/region';

export interface UIState {
  selected_agent_id?: AgentId;
  selected_region_id?: RegionId;
  selected_land_id?: LandId;
  selected_army_id?: ArmyId;
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
