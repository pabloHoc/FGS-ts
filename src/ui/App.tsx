import { EndTurnButton } from './components/EndTurnButton';
import { game } from '../game';
import { GameCtx } from './context/GameCtx';
import { RegionsList } from './components/RegionsList';
import { LandsList } from './components/LandsList';
import { EmpireDetails } from './components/EmpireDetails';
import { BuildingsPanel } from './components/BuildingsPanel';

/**
 * We probably need to listen to a START GAME event
 * before starting to render everything
 */
const App = () => {
  return (
    <GameCtx.Provider value={game}>
      <EmpireDetails />
      <RegionsList />
      <LandsList />
      <BuildingsPanel />
      <EndTurnButton />
    </GameCtx.Provider>
  );
};

export default App;
