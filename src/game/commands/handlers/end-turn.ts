import { CommandExecutor, Handler } from '../../core/command-executor';
import { EndTurn } from '../end-turn';
import { produceResources } from '../produce-resources';
import { startTurn } from '../start-turn';
import { processBuildingQueues } from '../process-building-queues';
import { processAgentActions } from '../process-agent-actions';
import { processSpells } from '../process-spells';
import { GlobalGameBlackboard } from '../../core/game-context';
import { Empire } from '../../entities/empire';
import { processBattles } from '../process-battles';

export const endTurn: Handler<EndTurn> = () => {
  const empires =
    GlobalGameBlackboard.instance.getAllEntities<Empire>('EMPIRE');

  for (const empire of empires) {
    if (!empire.isPlayer && empire.ai) {
      empire.ai.generatePlan();
      empire.ai.executePlan();
    }
  }

  CommandExecutor.instance.execute(processSpells());
  CommandExecutor.instance.execute(processBattles());
  CommandExecutor.instance.execute(processAgentActions());
  CommandExecutor.instance.execute(processBuildingQueues());
  CommandExecutor.instance.execute(produceResources());
  CommandExecutor.instance.execute(startTurn());
};
