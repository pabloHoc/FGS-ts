import { useContext, useEffect, useState } from 'react';
import { BuildingDefinition } from '../../game/definitions/building';
import { Empire } from '../../game/entities/empire';
import { Land } from '../../game/entities/land';
import { Region } from '../../game/entities/region';
import { GameCtx } from '../context/GameCtx';
import { UIStateCtx } from '../context/UIStateCtx';
import { addBuildingToQueue } from '../../game/commands/add-building-to-queue';
import { isPlayerEmpire } from '../../game/helpers/empire';

export const BuildingsPanel = () => {
  const game = useContext(GameCtx);
  const { uiState } = useContext(UIStateCtx);
  const [empire, setEmpire] = useState<Empire>();
  const [selectedLand, setSelectedLand] = useState<Land>();

  useEffect(() => {
    if (!uiState.selected_land_id) return;

    const land = game.context.getEntity<Land>('LAND', uiState.selected_land_id);
    setSelectedLand(land);

    const region = game.context.getEntity<Region>('REGION', land.regionId);
    if (!region.empireId) return setEmpire(undefined);

    const empire = game.context.getEntity<Empire>('EMPIRE', region.empireId);
    if (!isPlayerEmpire(empire.id)) return setEmpire(undefined);

    setEmpire(empire);
  }, [uiState]);

  const handleBuildBuilding = (buildingName: BuildingDefinition['name']) => {
    if (!uiState.selected_land_id || !empire) return;

    game.commands.execute(
      addBuildingToQueue(buildingName, uiState.selected_land_id, empire.id)
    );
  };

  if (!selectedLand || !empire) return null;

  return (
    <div>
      <h3>BUILDINGS</h3>
      {game.definitions
        .getAll<BuildingDefinition>('BUILDING')
        .map((building) => (
          <button
            key={building.name}
            onClick={() => handleBuildBuilding(building.name)}
            disabled={!building.allow(empire, selectedLand)}
          >
            {building.name}
          </button>
        ))}
    </div>
  );
};
