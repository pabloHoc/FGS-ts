import { MouseEvent, MouseEventHandler, useContext, useState } from 'react';
import { EntityId } from '../../game/entities';
import { Region } from '../../game/entities/region';
import { moveAgent } from '../../game/events/move-agent';
import { SelectAgent } from '../../game/events/select-agent';
import { selectRegion } from '../../game/events/select-region';
import { GameCtx } from '../context/GameCtx';
import { useListener } from '../hook/useListener';

interface RegionItemProps {
  id: EntityId;
  name: string;
  onClick: (id: EntityId) => void;
  onRightClick: (id: EntityId) => void;
  selected: boolean;
}

const RegionItem = ({
  id,
  name,
  onClick,
  onRightClick,
  selected,
}: RegionItemProps) => {
  const handleClick = (event: MouseEvent<HTMLLIElement>) => {
    event.preventDefault();

    if (event.button === 0) {
      onClick(id);
    }
    if (event.button === 0) {
      onRightClick(id);
    }
  };

  return (
    <li
      onClick={handleClick}
      onContextMenu={handleClick}
      style={{ color: selected ? '#FF0000' : '#000000' }}
    >
      {name}
    </li>
  );
};

export const RegionsList = () => {
  const game = useContext(GameCtx);
  const [regions, setRegions] = useState<Region[]>(
    game.entities.getAll<Region>('REGION')
  );
  const [selectedRegionId, setSelectedRegionId] = useState<EntityId>();
  const [selectedAgentId, setSelectedAgentId] = useState<EntityId>();

  const handleTurnStarted = () => {
    setRegions(game.entities.getAll<Region>('REGION'));
  };

  const handleAgentSelected = (event: SelectAgent) => {
    setSelectedAgentId(event.agentId);
  };

  useListener('START_TURN', handleTurnStarted);
  useListener('SELECT_AGENT', handleAgentSelected);

  const handleClickedRegion = (regionId: EntityId) => {
    game.events.dispatch(selectRegion(regionId));
    setSelectedRegionId(regionId);
  };

  const handleRightClickedRegion = (regionId: EntityId) => {
    if (!selectedAgentId) return;
    game.events.dispatch(moveAgent(selectedAgentId, regionId));
  };

  return (
    <div>
      <h3>REGIONS</h3>
      <ul>
        {regions.map((region) => (
          <RegionItem
            key={region.id}
            id={region.id}
            name={region.name}
            onClick={handleClickedRegion}
            onRightClick={handleRightClickedRegion}
            selected={region.id === selectedRegionId}
          />
        ))}
      </ul>
    </div>
  );
};
