import { EndTurnButton } from './components/EndTurnButton';
import { GameCtxProvider } from './context/GameCtx';
import { RegionsList } from './components/RegionsList';
import { RegionPanel as SelectedRegionPanel } from './components/RegionPanel';
import { EmpireDetails } from './components/EmpireDetails';
import { BuildingsPanel } from './components/BuildingsPanel';
import { AgentsList } from './components/AgentsList';
import { UIStateCtxProvider } from './context/UIStateCtx';
import { AgentActionsPanel } from './components/AgentActionsPanel';
import { AgentSpellsPanel } from './components/AgentSpellsPanel';
import { ArmiesList } from './components/ArmiesList';

const EmpirePanel = () => (
  <>
    <EmpireDetails />
  </>
);

const AgentsPanel = () => (
  <>
    <AgentsList />
    <AgentActionsPanel />
    <AgentSpellsPanel />
  </>
);

const RegionsPanel = () => (
  <>
    <RegionsList />
  </>
);

const RegionPanel = () => (
  <>
    <SelectedRegionPanel />
    <BuildingsPanel />
  </>
);

/**
 * We probably need to listen to a START GAME event
 * before starting to render everything
 */
const App = () => {
  return (
    <UIStateCtxProvider>
      <GameCtxProvider>
        <EmpirePanel />
        <AgentsPanel />
        <ArmiesList />
        <RegionsPanel />
        <RegionPanel />
        <EndTurnButton />
      </GameCtxProvider>
    </UIStateCtxProvider>
  );
};

export default App;
