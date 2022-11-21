import { DefinitionManager } from '../../core/definition-manager';
import { CommandExecutor, Handler } from '../../core/command-executor';
import { GameContext } from '../../core/game-context';
import { EndTurn } from '../end-turn';
import { produceResources } from '../produce-resources';
import { startTurn } from '../start-turn';
import { processBuildingQueues } from '../process-building-queues';
import { processAgentActions } from '../process-agent-actions';

export const endTurn: Handler<EndTurn> = (command: EndTurn) => {
  CommandExecutor.instance.execute(processAgentActions());
  CommandExecutor.instance.execute(processBuildingQueues());
  CommandExecutor.instance.execute(produceResources());
  CommandExecutor.instance.execute(startTurn());
};
