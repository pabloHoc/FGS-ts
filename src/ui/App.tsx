import { EndTurnButton } from './components/EndTurnButton';
import { game } from '../game';
import { GameCtx } from './context/GameCtx';
import { RegionsList } from './components/RegionsList';
import { LandsList } from './components/LandsList';
import { EmpireDetails } from './components/EmpireDetails';
import { BuildingsPanel } from './components/BuildingsPanel';
import { AgentsList } from './components/AgentsList';

declare global {
  interface Window {
    game: any;
  }
}

/**
 * We probably need to listen to a START GAME event
 * before starting to render everything
 */
const App = () => {
  window.game = game;

  return (
    <GameCtx.Provider value={game}>
      <EmpireDetails />
      <AgentsList />
      <RegionsList />
      <LandsList />
      <BuildingsPanel />
      <EndTurnButton />
    </GameCtx.Provider>
  );
};

export default App;
