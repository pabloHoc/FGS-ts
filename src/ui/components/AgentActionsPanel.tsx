import { useContext, useEffect, useState } from 'react';
import { AgentActionDefinition } from '../../game/definitions/agent-action';
import { createActionQueueItem } from '../../game/entities/action-queue-item';
import { Agent } from '../../game/entities/agent';
import { GameCtx } from '../context/GameCtx';
import { UIStateCtx } from '../context/UIStateCtx';

export const AgentActionsPanel = () => {
  const game = useContext(GameCtx);
  const { uiState, setUIState } = useContext(UIStateCtx);
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

  const handleClick = (agentAction: AgentActionDefinition) => {
    selectedAgent.currentAction = createActionQueueItem(agentAction, 1);
    setUIState({ ...uiState });
  };

  return (
    <>
      {game.definitions
        .getAll<AgentActionDefinition>('AGENT-ACTION')
        .map((agentAction) =>
          agentAction.allow(selectedAgent, game.context) ? (
            <button
              key={`${agentAction.name.replaceAll('_', ' ')} (${
                agentAction.baseExecutionTime
              })`}
              onClick={() => handleClick(agentAction)}
              disabled={agentAction.name === selectedAgent.currentAction?.name}
            >
              {agentAction.name}
            </button>
          ) : null
        )}
    </>
  );
};
