import { EndTurnButton } from './components/EndTurnButton';
import { GameCtxProvider } from './context/GameCtx';
import { RegionsList } from './components/RegionsList';
import { LandsList } from './components/LandsList';
import { EmpireDetails } from './components/EmpireDetails';
import { BuildingsPanel } from './components/BuildingsPanel';
import { AgentsList } from './components/AgentsList';
import { UIStateCtxProvider } from './context/UIStateCtx';
import { AgentActionsPanel } from './components/AgentActionsPanel';
import { AgentSpellsPanel } from './components/AgentSpellsPanel';

/**
 * We probably need to listen to a START GAME event
 * before starting to render everything
 */
const App = () => {
  return (
    <UIStateCtxProvider>
      <GameCtxProvider>
        <EmpireDetails />
        <AgentsList />
        <AgentActionsPanel />
        <AgentSpellsPanel />
        <RegionsList />
        <LandsList />
        <BuildingsPanel />
        <EndTurnButton />
      </GameCtxProvider>
    </UIStateCtxProvider>
  );
};

export default App;
