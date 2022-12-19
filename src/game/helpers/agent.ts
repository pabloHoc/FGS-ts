import { GameBlackboard } from '../core/game-blackboard';
import { GlobalGameBlackboard } from '../core/game-context';
import { Agent } from '../entities/agent';
import { EmpireId } from '../entities/empire';

export const getEmpireAgents = (
  empireId: EmpireId,
  context: GameBlackboard = GlobalGameBlackboard.instance
) =>
  context
    .getAllEntities<Agent>('AGENT')
    .filter((agent) => agent.empireId === empireId);
