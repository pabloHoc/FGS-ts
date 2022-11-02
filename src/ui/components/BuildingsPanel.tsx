import { useContext, useEffect, useState } from 'react';
import { BuildingDefinition } from '../../game/definitions/building';
import { Empire } from '../../game/entities/empire';
import { Land } from '../../game/entities/land';
import { Region } from '../../game/entities/region';
import { GameCtx } from '../context/GameCtx';
import { UIStateCtx } from '../context/UIStateCtx';
import { addBuildingToQueue } from '../../game/commands/add-building-to-queue';

export const BuildingsPanel = () => {
  const game = useContext(GameCtx);
  const { uiState } = useContext(UIStateCtx);
  const [empire, setEmpire] = useState<Empire>();

  const clearSelection = () => {
    setEmpire(undefined);
  };

  useEffect(() => {
    if (!uiState.selectedLandId) return;

    const land = game.context.getEntity<Land>('LAND', uiState.selectedLandId);
    const region = game.context.getEntity<Region>('REGION', land.regionId);
    if (!region.empireId) return clearSelection();

    const empire = game.context.getEntity<Empire>('EMPIRE', region.empireId);
    if (!empire.isPlayer) return clearSelection();

    setEmpire(empire);
  }, [uiState]);

  const handleBuildBuilding = (buildingName: BuildingDefinition['name']) => {
    if (!uiState.selectedLandId || !empire) return;

    game.commands.execute(
      addBuildingToQueue(buildingName, uiState.selectedLandId, empire.id)
    );
  };

  if (!uiState.selectedLandId || !empire) return null;

  return (
    <div>
      <h3>BUILDINGS</h3>
      {game.definitions
        .getAll<BuildingDefinition>('BUILDING')
        .map((building) => (
          <button
            key={building.name}
            onClick={() => handleBuildBuilding(building.name)}
            disabled={!building.allow(empire)}
          >
            {building.name}
          </button>
        ))}
    </div>
  );
};
