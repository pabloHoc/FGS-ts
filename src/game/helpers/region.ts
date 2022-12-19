import { GameBlackboard } from '../core/game-blackboard';
import { GlobalGameBlackboard } from '../core/game-context';
import { Agent } from '../entities/agent';
import { EmpireId } from '../entities/empire';
import { Region } from '../entities/region';

export const getEmpireRegions = (
  empireId: EmpireId,
  context: GameBlackboard = GlobalGameBlackboard.instance
) =>
  context
    .getAllEntities<Region>('REGION')
    .filter((region) => region.empireId === empireId);

export const getAgentCurrentRegion = (
  agent: Agent,
  context: GameBlackboard = GlobalGameBlackboard.instance
) => context.getEntity<Region>('REGION', agent.regionId);
