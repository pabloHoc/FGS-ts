import { Commands } from '..';
import { Handlers } from '../../core/dispatcher';
import { createEmpire } from './create-empire';
import { createLand } from './create-land';
import { startTurn } from './start-turn';
import { moveAgent } from './move-agent';
import { createRegion } from './create-region';
import { createAgent } from './create-agent';
import { buildBuilding } from './build-building';
import { moveAgents } from './move-agents';
import { produceResources } from './produce-resources';
import { endTurn } from './end-turn';

export const HANDLERS: Handlers = {
  START_TURN: startTurn,
  END_TURN: endTurn,
  CREATE_EMPIRE: createEmpire,
  CREATE_REGION: createRegion,
  CREATE_LAND: createLand,
  CREATE_AGENT: createAgent,
  MOVE_AGENT: moveAgent,
  BUILD_BUILDING: buildBuilding,
  MOVE_AGENTS: moveAgents,
  PRODUCE_RESOURCES: produceResources,
};
