import { GlobalGameBlackboard } from '../../core/game-context';
import { Empire } from '../../entities/empire';

export const processEmpireAIs = () => {
  const empires =
    GlobalGameBlackboard.instance.getAllEntities<Empire>('EMPIRE');

  for (const empire of empires) {
    if (!empire.isPlayer && empire.ai) {
      empire.ai.generatePlan();
      empire.ai.executePlan();
    }
  }
};
