import { useContext, useEffect, useState } from 'react';
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
    selectedAgent.currentAction = createActionQueueItem(spell, 1);
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
              spell.name === selectedAgent.currentAction?.name ||
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
