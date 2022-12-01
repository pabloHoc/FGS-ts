import { GlobalGameBlackboard } from '../core/game-context';
import { Agent } from '../entities/agent';
import { Empire } from '../entities/empire';
import { Region } from '../entities/region';

export const getRegionFromAgent = (agent: Agent) =>
  GlobalGameBlackboard.instance.getEntity<Region>('REGION', agent.regionId);

export const getEmpireFromAgent = (agent: Agent) =>
  GlobalGameBlackboard.instance.getEntity<Empire>('EMPIRE', agent.empireId);
