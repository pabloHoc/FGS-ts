import { useContext, useEffect, useState } from 'react';
import { Agent } from '../../game/entities/agent';
import { GameCtx } from '../context/GameCtx';
import { UIStateCtx } from '../context/UIStateCtx';

export const AgentActionsPanel = () => {
  const game = useContext(GameCtx);
  const { uiState } = useContext(UIStateCtx);
  const [selectedAgent, setSelectedAgent] = useState<Agent>();

  useEffect(() => {
    if (!uiState.selectedAgentId) return;

    const agent = game.context.getEntity<Agent>(
      'AGENT',
      uiState.selectedAgentId
    );
    setSelectedAgent(agent);
  }, [uiState]);

  if (!selectedAgent) return null;
};
