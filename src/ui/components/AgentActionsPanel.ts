import { useContext, useState } from 'react';
import { Agent } from '../../game/entities/agent';
import { SelectAgent } from '../../game/commands/select-agent';
import { GameCtx } from '../context/GameCtx';
import { useListener } from '../hook/useListener';

export const AgentActionsPanel = () => {
  const game = useContext(GameCtx);
  const [selectedAgent, setSelectedAgent] = useState<Agent>();

  const handleAgentSelected = (event: SelectAgent) => {
    const agent = game.entities.get<Agent>('AGENT', event.agentId);
    setSelectedAgent(agent);
  };

  useListener('SELECT_AGENT', handleAgentSelected);

  if (!selectedAgent) return null;
};
