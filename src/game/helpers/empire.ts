import { GlobalGameBlackboard } from '../core/game-context';
import { Empire, EmpireId } from '../entities/empire';
import { getPlayer } from './player';

export const getPlayerEmpire = () =>
  GlobalGameBlackboard.instance.getEntity<Empire>(
    'EMPIRE',
    getPlayer().empireId
  );

export const isPlayerEmpire = (empireId: EmpireId) =>
  getPlayerEmpire().id === empireId;
