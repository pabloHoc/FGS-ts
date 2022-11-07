import { useContext, useEffect, useState } from 'react';
import { GameContext } from '../../game/core/game-context';
import { EntityId } from '../../game/entities';
import { Agent } from '../../game/entities/agent';
import { Region } from '../../game/entities/region';
import { getEmpireAgents } from '../../game/helpers/agent';
import { getPlayerEmpire } from '../../game/helpers/empire';
import { GameCtx } from '../context/GameCtx';
import { UIStateCtx } from '../context/UIStateCtx';

const AgentItem = ({
  agent,
  entities,
  onClick,
}: {
  agent: Agent;
  entities: GameContext;
  onClick: (agentId: EntityId) => void;
}) => {
  const region = entities.getEntity<Region>('REGION', agent.regionId);

  return (
    <li onClick={() => onClick(agent.id)}>
      {agent.name} ({region.name}){' '}
      {agent.currentAction
        ? `| Action: ${agent.currentAction.name} | Remaining Turns: ${agent.currentAction.remainingTurns}`
        : ''}
    </li>
  );
};

export const AgentsList = () => {
  const game = useContext(GameCtx);
  const { uiState, setUIState } = useContext(UIStateCtx);
  const [agents, setAgents] = useState<Agent[]>([]);

  const playerEmpire = getPlayerEmpire(game.context);

  if (!playerEmpire) return null;

  const updateAgents = () => {
    const agents = getEmpireAgents(playerEmpire.id, game.context);
    setAgents(agents);
  };

  useEffect(updateAgents, [uiState]);

  const handleAgentClicked = (agentId: EntityId) => {
    setUIState({ ...uiState, selected_agent_id: agentId });
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
          />
        ))}
      </ul>
    </div>
  );
};
