import { GameContext } from '../core/game-context';
import { Agent } from '../entities/agent';
import { Empire } from '../entities/empire';
import { Region } from '../entities/region';

export const getRegionFromAgent = (agent: Agent, gameContext: GameContext) =>
  gameContext.getEntity<Region>('REGION', agent.regionId);

export const getEmpireFromAgent = (agent: Agent, gameContext: GameContext) =>
  gameContext.getEntity<Empire>('EMPIRE', agent.empireId);
