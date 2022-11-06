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
import { addBuildingToQueue } from './add-building-to-queue';
import { processBuildingQueues } from './process-building-queues';
import { setOwner } from './set-owner';

export const HANDLERS: Handlers = {
  START_TURN: startTurn,
  END_TURN: endTurn,
  CREATE_EMPIRE: createEmpire,
  CREATE_REGION: createRegion,
  CREATE_LAND: createLand,
  CREATE_AGENT: createAgent,
  MOVE_AGENT: moveAgent,
  BUILD_BUILDING: buildBuilding,
  ADD_BUILDING_TO_QUEUE: addBuildingToQueue,
  PROCESS_BUILDING_QUEUES: processBuildingQueues,
  MOVE_AGENTS: moveAgents,
  PRODUCE_RESOURCES: produceResources,
  SET_OWNER: setOwner,
};
