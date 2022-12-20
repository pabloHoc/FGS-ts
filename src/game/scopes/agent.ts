import { GameBlackboard } from '../core/game-blackboard';
import { GlobalGameBlackboard } from '../core/game-context';
import { Agent } from '../entities/agent';
import { Empire } from '../entities/empire';
import { Region } from '../entities/region';

export const getRegionFromAgent = (
  agent: Agent,
  context: GameBlackboard = GlobalGameBlackboard.instance
) => context.getEntity<Region>('REGION', agent.regionId);

export const getEmpireFromAgent = (
  agent: Agent,
  context: GameBlackboard = GlobalGameBlackboard.instance
) => context.getEntity<Empire>('EMPIRE', agent.empireId);
