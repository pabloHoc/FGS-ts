import { DefinitionManager } from '../../core/definition-manager';
import { CommandExecutor, Handler } from '../../core/command-executor';
import { GameContext } from '../../core/game-context';
import { EndTurn } from '../end-turn';
import { produceResources } from '../produce-resources';
import { startTurn } from '../start-turn';
import { processBuildingQueues } from '../process-building-queues';
import { processAgentActions } from '../process-agent-actions';

export const endTurn: Handler<EndTurn> = (
  command: EndTurn,
  commandExecutor: CommandExecutor
) => {
  commandExecutor.execute(processAgentActions());
  commandExecutor.execute(processBuildingQueues());
  commandExecutor.execute(produceResources());
  commandExecutor.execute(startTurn());
};
