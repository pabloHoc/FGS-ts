import { useContext, useEffect, useState } from 'react';
import { GameBlackboard } from '../../game/core/game-blackboard';
import { Agent, AgentId } from '../../game/entities/agent';
import { Region } from '../../game/entities/region';
import { getEmpireAgents } from '../../game/helpers/agent';
import { getPlayerEmpire } from '../../game/helpers/empire';
import { GameCtx } from '../context/GameCtx';
import { UIStateCtx } from '../context/UIStateCtx';

const AgentItem = ({
  agent,
  entities,
  onClick,
  selected,
}: {
  agent: Agent;
  entities: GameBlackboard;
  onClick: (agentId: AgentId) => void;
  selected: boolean;
}) => {
  const region = entities.getEntity<Region>('REGION', agent.regionId);

  return (
    <li
      onClick={() => onClick(agent.id)}
      style={{ color: selected ? 'red' : 'black' }}
    >
      {agent.name} ({region.name}){' '}
      {agent.actions[0]
        ? `| Action: ${agent.actions[0].name} | Remaining Turns: ${agent.actions[0].remainingTurns}`
        : ''}
    </li>
  );
};

export const AgentsList = () => {
  const game = useContext(GameCtx);
  const { uiState, setUIState } = useContext(UIStateCtx);
  const [agents, setAgents] = useState<Agent[]>([]);

  const playerEmpire = getPlayerEmpire();

  if (!playerEmpire) return null;

  const updateAgents = () => {
    const agents = getEmpireAgents(playerEmpire.id);
    setAgents(agents);
  };

  useEffect(updateAgents, [uiState]);

  const handleAgentClicked = (agentId: AgentId) => {
    setUIState({
      ...uiState,
      selected_army_id: undefined,
      selected_agent_id: agentId,
    });
  };

  return (
    <div>
      <h3>AGENTS</h3>
      <ul>
        {agents.map((agent) => (
          <AgentItem
            key={agent.name}
            agent={agent}
            entities={game.context}
            onClick={handleAgentClicked}
            selected={uiState.selected_agent_id === agent.id}
          />
        ))}
      </ul>
    </div>
  );
};
