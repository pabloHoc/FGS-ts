import { DefinitionManager } from '../../core/definition-manager';
import { Dispatcher, Handler } from '../../core/dispatcher';
import { GameContext } from '../../core/game-context';
import { EndTurn } from '../end-turn';
import { moveAgents } from '../move-agents';
import { produceResources } from '../produce-resources';
import { startTurn } from '../start-turn';
import { processBuildingQueues } from '../process-building-queues';
import { processAgentActions } from '../process-agent-actions';

export const endTurn: Handler<EndTurn> = (
  command: EndTurn,
  gameContext: GameContext,
  definitionManager: DefinitionManager,
  dispatcher: Dispatcher
) => {
  dispatcher.execute(moveAgents());
  dispatcher.execute(processAgentActions());
  dispatcher.execute(processBuildingQueues());
  dispatcher.execute(produceResources());
  dispatcher.execute(startTurn());
};
