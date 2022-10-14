import { useContext, useState } from 'react';
import { BuildingDefinition } from '../../game/definitions/building';
import { Empire } from '../../game/entities/empire';
import { Land } from '../../game/entities/land';
import { Region } from '../../game/entities/region';
import { buildBuilding } from '../../game/events/build-building';
import { SelectLand } from '../../game/events/select-land';
import { GameCtx } from '../context/GameCtx';
import { useListener } from '../hook/useListener';

export const BuildingsPanel = () => {
  const game = useContext(GameCtx);
  const [selectedLand, setSelectedLand] = useState<Land>();
  const [empire, setEmpire] = useState<Empire>();

  const clearSelection = () => {
    setSelectedLand(undefined);
    setEmpire(undefined);
  };

  const handleSelectedLand = (event: SelectLand) => {
    const land = game.entities.get<Land>('LAND', event.landId);
    const region = game.entities.get<Region>('REGION', land.regionId);
    if (!region.empireId) {
      clearSelection();
      return;
    }

    const empire = game.entities.get<Empire>('EMPIRE', region.empireId);
    if (!empire.isPlayer) {
      clearSelection();
      return;
    }

    setSelectedLand(land);
    setEmpire(empire);
  };

  const updateBuildings = () => {
    setSelectedLand((land) => {
      if (land) return { ...land };
    });
  };

  useListener('SELECT_REGION', clearSelection);
  useListener('SELECT_LAND', handleSelectedLand);
  useListener('START_TURN', updateBuildings);
  useListener('UPDATE_RESOURCES', updateBuildings);

  const handleBuildBuilding = (buildingName: BuildingDefinition['name']) => {
    if (!selectedLand || !empire) return;

    game.events.dispatch(
      buildBuilding(buildingName, selectedLand.id, empire.id)
    );
  };

  if (!selectedLand || !empire) return null;

  return (
    <div>
      <h3>BUILDINGS</h3>
      {game.definitions
        .getAll<BuildingDefinition>('building')
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
