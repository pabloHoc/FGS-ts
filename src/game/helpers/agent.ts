import { GlobalGameBlackboard } from '../core/game-context';
import { Agent } from '../entities/agent';
import { EmpireId } from '../entities/empire';

export const getEmpireAgents = (empireId: EmpireId) =>
  GlobalGameBlackboard.instance
    .getAllEntities<Agent>('AGENT')
    .filter((agent) => agent.empireId === empireId);
