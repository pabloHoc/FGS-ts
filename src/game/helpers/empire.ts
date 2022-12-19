import { GameBlackboard } from '../core/game-blackboard';
import { GlobalGameBlackboard } from '../core/game-context';
import { Empire, EmpireId } from '../entities/empire';
import { getPlayer } from './player';

export const getPlayerEmpire = (
  context: GameBlackboard = GlobalGameBlackboard.instance
) => context.getEntity<Empire>('EMPIRE', getPlayer().empireId);

export const isPlayerEmpire = (
  empireId: EmpireId,
  context: GameBlackboard = GlobalGameBlackboard.instance
) => getPlayerEmpire(context).id === empireId;
