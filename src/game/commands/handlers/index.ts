import { Handlers } from '../../core/command-executor';
import { createEmpire } from './create-empire';
import { createLand } from './create-land';
import { startTurn } from './start-turn';
import { createRegion } from './create-region';
import { createAgent } from './create-agent';
import { buildBuilding } from './build-building';
import { produceResources } from './produce-resources';
import { endTurn } from './end-turn';
import { addBuildingToQueue } from './add-building-to-queue';
import { processBuildingQueues } from './process-building-queues';
import { setOwner } from './set-owner';
import { processAgentActions } from './process-agent-actions';
import { setLocation } from './set-location';

export const HANDLERS: Handlers = {
  START_TURN: startTurn,
  END_TURN: endTurn,
  CREATE_EMPIRE: createEmpire,
  CREATE_REGION: createRegion,
  CREATE_LAND: createLand,
  CREATE_AGENT: createAgent,
  BUILD_BUILDING: buildBuilding,
  ADD_BUILDING_TO_QUEUE: addBuildingToQueue,
  PROCESS_BUILDING_QUEUES: processBuildingQueues,
  PRODUCE_RESOURCES: produceResources,
  SET_OWNER: setOwner,
  PROCESS_AGENT_ACTIONS: processAgentActions,
  SET_LOCATION: setLocation,
};
