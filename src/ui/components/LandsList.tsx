import { useContext, useEffect, useState } from 'react';
import { BuildingDefinition } from '../../game/definitions/building';
import { LandDefinition } from '../../game/definitions/land';
import { EntityId } from '../../game/entities';
import { Empire } from '../../game/entities/empire';
import { Land } from '../../game/entities/land';
import { Region } from '../../game/entities/region';
import { SelectLand, selectLand } from '../../game/commands/select-land';
import { SelectRegion } from '../../game/commands/select-region';
import { GameCtx } from '../context/GameCtx';
import { useListener } from '../hook/useListener';

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
  const [lands, setLands] = useState<Land[]>([]);
  const [selectedLandId, setSelectedLandId] = useState<EntityId>();
  const [selectedRegion, setSelectedRegion] = useState<Region>();
  const [empireName, setEmpireName] = useState('');

  useEffect(() => {
    const regionLands = game.entities
      .getAll<Land>('LAND')
      .filter((land) => land.regionId === selectedRegion?.id);

    setLands(regionLands);
  }, [selectedRegion]);

  const handleRegionSelected = (event: SelectRegion) => {
    const region = game.entities.get<Region>('REGION', event.regionId);
    setSelectedRegion(region);

    if (region.empireId) {
      const empire = game.entities.get<Empire>('EMPIRE', region.empireId);
      setEmpireName(empire.name);
      return;
    }
    setEmpireName('');
  };

  const handleBuildingBuilt = () => {
    setLands((lands) => [...lands]);
  };

  const handleLandSelected = (event: SelectLand) => {
    setSelectedLandId(event.landId);
  };

  useListener('SELECT_LAND', handleLandSelected);
  useListener('SELECT_REGION', handleRegionSelected);
  useListener('BUILD_BUILDING', handleBuildingBuilt);

  const handleClickedLand = (landId: EntityId) => {
    game.events.dispatch(selectLand(landId));
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
            selected={land.id === selectedLandId}
          />
        ))}
      </ul>
    </div>
  );
};
