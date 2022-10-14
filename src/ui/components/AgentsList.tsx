import { useContext, useEffect, useState } from 'react';
import { EntityManager } from '../../game/core/entity-manager';
import { EntityId } from '../../game/entities';
import { Agent } from '../../game/entities/agent';
import { Region } from '../../game/entities/region';
import { selectAgent } from '../../game/events/select-agent';
import { getEmpireAgents } from '../../game/helpers/agent';
import { getPlayerEmpire } from '../../game/helpers/empire';
import { GameCtx } from '../context/GameCtx';
import { useListener } from '../hook/useListener';

const AgentItem = ({
  agent,
  entities,
  onClick,
}: {
  agent: Agent;
  entities: EntityManager;
  onClick: (agentId: EntityId) => void;
}) => {
  const region = entities.get<Region>('REGION', agent.regionId);

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
  const [agents, setAgents] = useState<Agent[]>([]);

  const playerEmpire = getPlayerEmpire(game.entities);

  if (!playerEmpire) return null;

  const updateAgents = () => {
    const agents = getEmpireAgents(playerEmpire.id, game.entities);
    setAgents(agents);
  };

  useEffect(updateAgents, []);
  useListener('START_TURN', updateAgents);
  useListener('MOVE_AGENT', updateAgents);

  const handleAgentClicked = (agentId: EntityId) => {
    game.events.dispatch(selectAgent(agentId));
  };

  return (
    <div>
      <h3>AGENTS</h3>
      <ul>
        {agents.map((agent) => (
          <AgentItem
            key={agent.name}
            agent={agent}
            entities={game.entities}
            onClick={handleAgentClicked}
          />
        ))}
      </ul>
    </div>
  );
};
