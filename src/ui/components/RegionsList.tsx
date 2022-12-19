import { MouseEvent, useContext, useEffect, useState } from 'react';
import { setAgentCurrentAction } from '../../game/commands/set-agent-current-action';
import { setLocation } from '../../game/commands/set-location';
import { AgentActionDefinition } from '../../game/definitions/agent-action';
import { createActionQueueItem } from '../../game/entities/action-queue-item';
import { Agent } from '../../game/entities/agent';
import { Region, RegionId } from '../../game/entities/region';
import { GameCtx } from '../context/GameCtx';
import { UIStateCtx } from '../context/UIStateCtx';

interface RegionItemProps {
  id: RegionId;
  name: string;
  onClick: (id: RegionId) => void;
  onRightClick: (id: RegionId) => void;
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

  const handleClickedRegion = (regionId: RegionId) => {
    setUIState({ ...uiState, selected_region_id: regionId });
  };

  const handleRightClickedRegion = (regionId: RegionId) => {
    if (uiState.selected_agent_id) {
      const moveAction = game.definitions.get<AgentActionDefinition>(
        'AGENT-ACTION',
        'move_agent'
      );
      const selectedAgent = game.context.getEntity<Agent>(
        'AGENT',
        uiState.selected_agent_id
      );
      game.commands.execute(
        setAgentCurrentAction(
          selectedAgent.id,
          createActionQueueItem(moveAction, {
            region_id: regionId,
          })
        )
      );
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
