import { CommandExecutor, Handler } from '../../core/command-executor';
import { EndTurn } from '../end-turn';
import { produceResources } from '../produce-resources';
import { startTurn } from '../start-turn';
import { processBuildingQueues } from '../process-building-queues';
import { processAgentActions } from '../process-agent-actions';
import { processSpells } from '../process-spells';

export const endTurn: Handler<EndTurn> = () => {
  CommandExecutor.instance.execute(processSpells());
  CommandExecutor.instance.execute(processAgentActions());
  CommandExecutor.instance.execute(processBuildingQueues());
  CommandExecutor.instance.execute(produceResources());
  CommandExecutor.instance.execute(startTurn());
};
