import { useContext, useEffect, useState } from 'react';
import { setAgentCurrentAction } from '../../game/commands/set-agent-current-action';
import { CommandExecutor } from '../../game/core/command-executor';
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
    if (!uiState.selected_agent_id) return setSelectedAgent(undefined);

    const agent = game.context.getEntity<Agent>(
      'AGENT',
      uiState.selected_agent_id
    );
    setSelectedAgent(agent);
  }, [uiState]);

  if (!selectedAgent) return null;

  const handleClick = (agentAction: AgentActionDefinition) => {
    CommandExecutor.instance.execute(
      setAgentCurrentAction(
        selectedAgent.id,
        createActionQueueItem(agentAction)
      )
    );
    setUIState({ ...uiState });
  };

  return (
    <>
      {game.definitions
        .getAll<AgentActionDefinition>('AGENT-ACTION')
        .map((agentAction) =>
          agentAction.show() ? (
            <button
              key={`${agentAction.name.replaceAll('_', ' ')} (${
                agentAction.baseExecutionTime
              })`}
              onClick={() => handleClick(agentAction)}
              disabled={
                (selectedAgent.actions[0] &&
                  agentAction.name === selectedAgent.actions[0].name) ||
                !agentAction.allow(selectedAgent)
              }
            >
              {agentAction.name}
            </button>
          ) : null
        )}
    </>
  );
};
