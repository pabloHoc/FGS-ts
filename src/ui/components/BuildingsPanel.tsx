import { useContext, useState } from 'react';
import { BuildingType, getBuildingsData } from '../../data/buildings';
import { Empire } from '../../game/entities/empire';
import { Land } from '../../game/entities/land';
import { buildBuilding } from '../../game/events/build-building';
import { SelectLand } from '../../game/events/select-land';
import { GameCtx } from '../context/GameCtx';
import { useListener } from '../hook/useListener';

export const BuildingsPanel = () => {
  const game = useContext(GameCtx);
  const [landSelected, setLandSelected] = useState<Land>();
  const [empire, setEmpire] = useState<Empire>();

  const handleLandSelected = (event: SelectLand) => {
    const land = game.entities.lands.find((land) => land.id === event.landId);
    const region = game.entities.regions.find(
      (region) => region.id === land?.regionId
    );
    const empire = game.entities.empires.find(
      (empire) => empire.id === region?.empireId
    );

    setLandSelected(land);
    setEmpire(empire);
  };

  const updateBuildings = () => {
    setLandSelected((land) => {
      if (land) return { ...land };
    });
  };

  useListener('SELECT_LAND', handleLandSelected);
  useListener('START_TURN', updateBuildings);
  useListener('UPDATE_RESOURCES', updateBuildings);

  const handleBuildBuilding = (buildingName: BuildingType) => {
    if (!landSelected) return;

    game.events.dispatch(buildBuilding(buildingName, landSelected.id));
  };

  const canBuildBuilding = (buildingName: BuildingType) => {
    const buildingsData = getBuildingsData();
    const buildingData = buildingsData.find(
      (buildingData) => buildingData.name === buildingName
    );

    if (!buildingData || !empire) return true;

    for (const buildingCost of buildingData.cost) {
      const storedResource = empire.resources.find(
        (resource) => resource.type === buildingCost.resource
      );

      if (!storedResource) return true;

      if (storedResource.quantity < buildingCost.base) {
        return true;
      }
    }
    return false;
  };

  if (!landSelected) return null;

  const buildingsData = getBuildingsData();

  return (
    <div>
      {buildingsData.map((building) => (
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
