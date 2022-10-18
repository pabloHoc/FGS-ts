import { MouseEvent, useContext, useEffect, useState } from 'react';
import { moveAgent } from '../../game/commands/move-agent';
import { EntityId } from '../../game/entities';
import { Region } from '../../game/entities/region';
import { GameCtx } from '../context/GameCtx';
import { UIStateCtx } from '../context/UIStateCtx';

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

    // HOW IS THIS WORKING?
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
    game.context.getAllEntities<Region>('REGION')
  );
  const { uiState, setUIState } = useContext(UIStateCtx);

  useEffect(() => {
    // Do we have to update this every time? Are regions going
    // to be created dinamycally?
    setRegions(game.context.getAllEntities<Region>('REGION'));
  }, [uiState]);

  const handleClickedRegion = (regionId: EntityId) => {
    setUIState({ ...uiState, selectedRegionId: regionId });
  };

  const handleRightClickedRegion = (regionId: EntityId) => {
    if (!uiState.selectedAgentId) return;
    game.commands.execute(moveAgent(uiState.selectedAgentId, regionId));
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
            selected={region.id === uiState.selectedRegionId}
          />
        ))}
      </ul>
    </div>
  );
};
