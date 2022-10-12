import { useContext, useEffect, useReducer, useState } from 'react';
import { BuildingType } from '../../data/buildings';
import { LandType } from '../../data/lands';
import { EntityId } from '../../game/entities';
import { Land } from '../../game/entities/land';
import { Region } from '../../game/entities/region';
import { BuildBuilding } from '../../game/events/build-building';
import { selectLand } from '../../game/events/select-land';
import { SelectRegion } from '../../game/events/select-region';
import { GameCtx } from '../context/GameCtx';
import { useListener } from '../hook/useListener';

interface LandItemProps {
  id: EntityId;
  landType: LandType;
  buildings: BuildingType[];
  onClick: (id: EntityId) => void;
}

const LandItem = ({ id, onClick, landType, buildings }: LandItemProps) => (
  <li onClick={() => onClick(id)}>
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
  const [regionSelected, setRegionSelected] = useState<Region>();
  const [regionOwner, setRegionOwner] = useState('');

  useEffect(() => {
    const regionLands = game.entities.lands.filter(
      (land) => land.regionId === regionSelected?.id
    );

    if (regionLands) {
      setLands(regionLands);
    }
  }, [regionSelected]);

  const handleRegionSelected = (event: SelectRegion) => {
    const region = game.entities.regions.find(
      (region) => region.id === event.regionId
    );
    if (!region) return;
    setRegionSelected(region);

    const empire = game.entities.empires.find(
      (empire) => empire.id === region.empireId
    );

    setRegionOwner(empire ? empire.name : '');
  };

  const handleBuildingBuilt = () => {
    setLands((lands) => [...lands]);
  };

  useListener('SELECT_REGION', handleRegionSelected);
  useListener('BUILD_BUILDING', handleBuildingBuilt);

  const handleLandClick = (landId: EntityId) => {
    game.events.dispatch(selectLand(landId));
  };

  return (
    <ul>
      {regionOwner && <p>EMPIRE: {regionOwner}</p>}
      {lands.map((land) => (
        <LandItem
          id={land.id}
          key={land.id}
          onClick={handleLandClick}
          landType={land.landType}
          buildings={land.buildings}
        />
      ))}
    </ul>
  );
};
