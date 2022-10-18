import { EndTurnButton } from './components/EndTurnButton';
import { GameCtxProvider } from './context/GameCtx';
import { RegionsList } from './components/RegionsList';
import { LandsList } from './components/LandsList';
import { EmpireDetails } from './components/EmpireDetails';
import { BuildingsPanel } from './components/BuildingsPanel';
import { AgentsList } from './components/AgentsList';
import { UIStateCtxProvider } from './context/UIStateCtx';

/**
 * We probably need to listen to a START GAME event
 * before starting to render everything
 */
const App = () => {
  return (
    <GameCtxProvider>
      <UIStateCtxProvider>
        <EmpireDetails />
        <AgentsList />
        <RegionsList />
        <LandsList />
        <BuildingsPanel />
        <EndTurnButton />
      </UIStateCtxProvider>
    </GameCtxProvider>
  );
};

export default App;
