import { useContext, useEffect, useState } from 'react';
import { setAgentCurrentAction } from '../../game/commands/set-agent-current-action';
import { CommandExecutor } from '../../game/core/command-executor';
import { AgentActionDefinition } from '../../game/definitions/agent-action';
import { SpellDefinition } from '../../game/definitions/spell';
import { createActionQueueItem } from '../../game/entities/action-queue-item';
import { Agent } from '../../game/entities/agent';
import { GameCtx } from '../context/GameCtx';
import { UIStateCtx } from '../context/UIStateCtx';

export const AgentSpellsPanel = () => {
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

  const handleClick = (spell: SpellDefinition) => {
    CommandExecutor.instance.execute(
      setAgentCurrentAction(selectedAgent.id, createActionQueueItem(spell))
    );
    setUIState({ ...uiState });
  };

  return (
    <>
      {game.definitions.getAll<SpellDefinition>('SPELL').map((spell) =>
        spell.show() ? (
          <button
            key={`${spell.name.replaceAll('_', ' ')} (${
              spell.baseExecutionTime
            })`}
            onClick={() => handleClick(spell)}
            disabled={
              (selectedAgent.actions[0] &&
                spell.name === selectedAgent.actions[0].name) ||
              !spell.allow(selectedAgent)
            }
          >
            {spell.name}
          </button>
        ) : null
      )}
    </>
  );
};
