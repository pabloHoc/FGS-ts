import { useContext, useEffect, useState } from 'react';
import { BuildingDefinition } from '../../game/definitions/building';
import { LandDefinition } from '../../game/definitions/land';
import { EntityId } from '../../game/entities';
import { Empire } from '../../game/entities/empire';
import { Land } from '../../game/entities/land';
import { Region } from '../../game/entities/region';
import { GameCtx } from '../context/GameCtx';
import { useListener } from '../hook/useListener';
import { UIStateCtx } from '../context/UIStateCtx';

interface LandItemProps {
  id: EntityId;
  name: LandDefinition['name'];
  buildings: BuildingDefinition['name'][];
  onClick: (id: EntityId) => void;
  selected: boolean;
}

const LandItem = ({
  id,
  onClick,
  name: landType,
  buildings,
  selected,
}: LandItemProps) => (
  <li
    onClick={() => onClick(id)}
    style={{ color: selected ? '#FF0000' : '#000000' }}
  >
    {landType}
    {!!buildings.length && (
      <ul>
        {buildings.map((building, i) => (
          <li key={i}>{building}</li>
        ))}
      </ul>
    )}
  </li>
);

export const LandsList = () => {
  const game = useContext(GameCtx);
  const { uiState, setUIState } = useContext(UIStateCtx);
  const [lands, setLands] = useState<Land[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<Region>();
  const [empireName, setEmpireName] = useState('');

  useEffect(() => {
    if (!uiState.selectedRegionId) {
      setLands([]);
      setEmpireName('');
      return;
    }
    // Fetch region
    const region = game.context.getEntity<Region>(
      'REGION',
      uiState.selectedRegionId
    );
    setSelectedRegion(region);

    // Fetch empire
    if (region.empireId) {
      const empire = game.context.getEntity<Empire>('EMPIRE', region.empireId);
      setEmpireName(empire.name);
    } else {
      setEmpireName('');
    }

    // Fetch lands
    const regionLands = game.context
      .getAllEntities<Land>('LAND')
      .filter((land) => land.regionId === uiState.selectedRegionId);

    setLands(regionLands);
  }, [uiState]);

  const handleBuildingBuilt = () => {
    setLands((lands) => [...lands]);
  };

  useListener('BUILD_BUILDING', handleBuildingBuilt);

  const handleClickedLand = (landId: EntityId) => {
    setUIState({ ...uiState, selectedLandId: landId });
  };

  return (
    <div>
      {selectedRegion && (
        <h3>{`${selectedRegion.name} ${
          empireName ? '(' + empireName + ')' : ''
        }`}</h3>
      )}
      <ul>
        {lands.map((land) => (
          <LandItem
            id={land.id}
            key={land.id}
            onClick={handleClickedLand}
            name={land.name}
            buildings={land.buildings}
            selected={land.id === uiState.selectedLandId}
          />
        ))}
      </ul>
    </div>
  );
};
