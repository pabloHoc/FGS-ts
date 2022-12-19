import { KonvaEventObject } from 'konva/lib/Node';
import { useContext } from 'react';
import { Layer, Line, Rect, Stage } from 'react-konva';
import { setAgentCurrentAction } from '../../game/commands/set-agent-current-action';
import { setLocation } from '../../game/commands/set-location';
import { CommandExecutor } from '../../game/core/command-executor';
import { AgentActionDefinition } from '../../game/definitions/agent-action';
import { createActionQueueItem } from '../../game/entities/action-queue-item';
import { Agent } from '../../game/entities/agent';
import { Region, RegionId } from '../../game/entities/region';
import { GameCtx } from '../context/GameCtx';
import { UIState, UIStateCtx } from '../context/UIStateCtx';

const GridLines = () => {
  const CHUNK_SIZE = window.innerHeight / 8;

  return (
    <>
      {new Array(10).fill(null).map((_, i) => (
        <Line
          key={i}
          points={[i * CHUNK_SIZE, 0, i * CHUNK_SIZE, window.innerHeight]}
          stroke="lightgray"
        />
      ))}
      {new Array(8).fill(null).map((_, i) => (
        <Line
          key={i}
          points={[0, i * CHUNK_SIZE, window.innerWidth, i * CHUNK_SIZE]}
          stroke="lightgray"
        />
      ))}
    </>
  );
};

const RegionItem = ({
  id,
  x,
  y,
  onClick,
  onRightClick,
  hasEmpire,
  selected,
}: {
  id: RegionId;
  x: number;
  y: number;
  onClick: (id: RegionId) => void;
  onRightClick: (id: RegionId) => void;
  hasEmpire: boolean;
  selected: boolean;
}) => {
  const REGION_SIZE = 30;

  const handleClick = (event: KonvaEventObject<PointerEvent>) => {
    if (event.evt.button === 0) {
      onClick(id);
    }

    if (event.evt.button === 2) {
      onRightClick(id);
    }
  };

  return (
    <Rect
      x={x}
      y={y}
      width={REGION_SIZE}
      height={REGION_SIZE}
      fill={selected ? 'blue' : hasEmpire ? 'red' : 'gray'}
      onClick={handleClick}
    />
  );
};

export const WorldMap = () => {
  const game = useContext(GameCtx);
  const { uiState, setUIState } = useContext(UIStateCtx);

  const CHUNK_SIZE = window.innerHeight / 8;
  const REGION_SIZE = 30;

  const handleRegionClick = (regionId: RegionId) => {
    setUIState((prevState: UIState) => ({
      ...prevState,
      selected_region_id: regionId,
    }));
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
      CommandExecutor.instance.execute(
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
    <Stage
      width={(window.innerHeight / 8) * 10}
      height={window.innerHeight}
      onContextMenu={(e) => e.evt.preventDefault()}
    >
      <Layer>
        <GridLines />
        {game.context.getAllEntities<Region>('REGION').map((region, i) =>
          region.connectedTo.map((regionToConnectId, j) => {
            const regionToConnect = game.context.getEntity<Region>(
              'REGION',
              regionToConnectId
            );
            // TODO: we have duplicated roads here!
            return regionToConnect ? (
              <Line
                key={i + j}
                points={[
                  region.x + REGION_SIZE / 2,
                  region.y + REGION_SIZE / 2,
                  regionToConnect.x + REGION_SIZE / 2,
                  regionToConnect.y + REGION_SIZE / 2,
                ]}
                stroke="black"
              />
            ) : null;
          })
        )}
        {game.context.getAllEntities<Region>('REGION').map((region) => (
          <RegionItem
            key={region.id}
            id={region.id}
            x={region.x}
            y={region.y}
            onClick={handleRegionClick}
            onRightClick={handleRightClickedRegion}
            hasEmpire={!!region.empireId}
            selected={uiState.selected_region_id === region.id}
          />
        ))}
      </Layer>
    </Stage>
  );
};
