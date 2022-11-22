import { MouseEvent, useContext, useEffect, useState } from 'react';
import { setLocation } from '../../game/commands/set-location';
import { AgentActionDefinition } from '../../game/definitions/agent-action';
import { EntityId } from '../../game/entities';
import { createActionQueueItem } from '../../game/entities/action-queue-item';
import { Agent } from '../../game/entities/agent';
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

    if (event.button === 0) {
      onClick(id);
    }
    if (event.button === 2) {
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
    setRegions(game.context.getAllEntities<Region>('REGION'));
  }, [uiState]);

  const handleClickedRegion = (regionId: EntityId) => {
    setUIState({ ...uiState, selected_region_id: regionId });
  };

  const handleRightClickedRegion = (regionId: EntityId) => {
    if (uiState.selected_agent_id) {
      const moveAction = game.definitions.get<AgentActionDefinition>(
        'AGENT-ACTION',
        'move_agent'
      );
      const selectedAgent = game.context.getEntity<Agent>(
        'AGENT',
        uiState.selected_agent_id
      );
      selectedAgent.currentAction = createActionQueueItem(moveAction, 1, {
        region_id: regionId,
      });
    } else if (uiState.selected_army_id) {
      game.commands.execute(setLocation(uiState.selected_army_id, regionId));
    }
    setUIState({ ...uiState });
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
            selected={region.id === uiState.selected_region_id}
          />
        ))}
      </ul>
    </div>
  );
};
