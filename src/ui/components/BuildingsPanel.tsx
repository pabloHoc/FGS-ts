import { useContext, useState } from 'react';
import {
  BuildingType,
  getBuildingData,
  getBuildingsData,
} from '../../data/buildings';
import { Empire } from '../../game/entities/empire';
import { Land } from '../../game/entities/land';
import { Region } from '../../game/entities/region';
import { buildBuilding } from '../../game/events/build-building';
import { SelectLand } from '../../game/events/select-land';
import { getEmpireResource } from '../../game/helpers/empire';
import { GameCtx } from '../context/GameCtx';
import { useListener } from '../hook/useListener';

export const BuildingsPanel = () => {
  const game = useContext(GameCtx);
  const [landSelected, setLandSelected] = useState<Land>();
  const [empire, setEmpire] = useState<Empire>();

  const clearSelection = () => {
    setLandSelected(undefined);
    setEmpire(undefined);
  };

  const handleLandSelected = (event: SelectLand) => {
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

    setLandSelected(land);
    setEmpire(empire);
  };

  const updateBuildings = () => {
    setLandSelected((land) => {
      if (land) return { ...land };
    });
  };

  useListener('SELECT_REGION', clearSelection);
  useListener('SELECT_LAND', handleLandSelected);
  useListener('START_TURN', updateBuildings);
  useListener('UPDATE_RESOURCES', updateBuildings);

  const handleBuildBuilding = (buildingName: BuildingType) => {
    if (!landSelected || !empire) return;

    game.events.dispatch(
      buildBuilding(buildingName, landSelected.id, empire.id)
    );
  };

  const canBuildBuilding = (buildingName: BuildingType) => {
    if (!empire) return true;

    const buildingData = getBuildingData(buildingName);

    for (const buildingCost of buildingData.cost) {
      const storedResource = getEmpireResource(empire, buildingCost.resource);

      if (!storedResource) return true;

      if (storedResource.quantity < buildingCost.base) {
        return true;
      }
    }
    return false;
  };

  if (!landSelected || !empire) return null;

  return (
    <div>
      {getBuildingsData().map((building) => (
        <button
          key={building.name}
          onClick={() => handleBuildBuilding(building.name)}
          disabled={canBuildBuilding(building.name)}
        >
          {building.name}
        </button>
      ))}
    </div>
  );
};
