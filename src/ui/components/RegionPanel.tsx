import { useContext, useEffect, useState } from 'react';
import { createArmy } from '../../game/commands/create-army';
import { BuildingDefinition } from '../../game/definitions/building';
import { LandDefinition } from '../../game/definitions/land';
import { Entity, EntityId } from '../../game/entities';
import { BuildingQueueItem } from '../../game/entities/building-queue-item';
import { Empire, EmpireId } from '../../game/entities/empire';
import { Land, LandId } from '../../game/entities/land';
import { Region } from '../../game/entities/region';
import { getSortedBuildingQueueForLand } from '../../game/helpers/building';
import { getPlayerEmpire, isPlayerEmpire } from '../../game/helpers/empire';
import { GameCtx } from '../context/GameCtx';
import { UIStateCtx } from '../context/UIStateCtx';

interface LandItemProps {
  id: LandId;
  name: LandDefinition['name'];
  buildings: BuildingDefinition['name'][];
  buildingQueue: BuildingQueueItem[];
  onClick: (id: LandId) => void;
  selected: boolean;
}

const LandItem = ({
  id,
  onClick,
  name: landType,
  buildings,
  buildingQueue,
  selected,
}: LandItemProps) => (
  <li
    onClick={() => onClick(id)}
    style={{ color: selected ? '#FF0000' : '#000000' }}
  >
    {landType}
    {!!buildings.length && (
      <div>
        <b>BUILDINGS</b>
        <ul>
          {buildings.map((building, i) => (
            <li key={i}>{building}</li>
          ))}
        </ul>
      </div>
    )}
    {!!buildingQueue.length && (
      <div>
        <b>BUILDING QUEUE</b>
        <ul>
          {buildingQueue.map((item, i) => (
            <li
              key={i}
            >{`${item.order}) ${item.buildingName} (${item.remainingTurns})`}</li>
          ))}
        </ul>
      </div>
    )}
  </li>
);

export const RegionPanel = () => {
  const game = useContext(GameCtx);
  const { uiState, setUIState } = useContext(UIStateCtx);
  const [lands, setLands] = useState<Land[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<Region>();
  const [empireName, setEmpireName] = useState('');

  useEffect(() => {
    if (!uiState.selected_region_id) {
      setLands([]);
      setEmpireName('');
      return;
    }
    // Fetch region
    const region = game.context.getEntity<Region>(
      'REGION',
      uiState.selected_region_id
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
      .filter((land) => land.regionId === uiState.selected_region_id);

    setLands(regionLands);
  }, [uiState]);

  const handleClickedLand = (landId: LandId) => {
    setUIState({ ...uiState, selected_land_id: landId });
  };

  const getBuildingQueue = (landId: LandId) =>
    getSortedBuildingQueueForLand(landId);

  const handleBuildArmy = () =>
    selectedRegion?.empireId &&
    game.commands.execute(
      createArmy(100, 20, 5, selectedRegion.empireId, selectedRegion.id)
    );

  return (
    <div>
      {selectedRegion && (
        <>
          <h3>{`${selectedRegion.name} ${
            empireName ? '(' + empireName + ')' : ''
          }`}</h3>
          {selectedRegion.empireId &&
            isPlayerEmpire(selectedRegion.empireId) && (
              <button onClick={handleBuildArmy}>Build Army</button>
            )}
        </>
      )}
      <ul>
        {lands.map((land) => (
          <LandItem
            id={land.id}
            key={land.id}
            onClick={handleClickedLand}
            name={land.name}
            buildings={land.buildings}
            buildingQueue={getBuildingQueue(land.id)}
            selected={land.id === uiState.selected_land_id}
          />
        ))}
      </ul>
    </div>
  );
};
