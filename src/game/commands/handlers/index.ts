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
import { processSpells } from './process-spells';
import { createArmy } from './create-army';
import { processBattles } from './process-battles';
import { setAgentCurrentAction } from './set-agent-current-action';
import { processEmpireAIs } from './process-empire-ais';

export const HANDLERS: Handlers = {
  START_TURN: startTurn,
  END_TURN: endTurn,
  CREATE_EMPIRE: createEmpire,
  CREATE_REGION: createRegion,
  CREATE_LAND: createLand,
  CREATE_AGENT: createAgent,
  CREATE_ARMY: createArmy,
  BUILD_BUILDING: buildBuilding,
  ADD_BUILDING_TO_QUEUE: addBuildingToQueue,
  PROCESS_BUILDING_QUEUES: processBuildingQueues,
  PRODUCE_RESOURCES: produceResources,
  SET_OWNER: setOwner,
  PROCESS_AGENT_ACTIONS: processAgentActions,
  SET_LOCATION: setLocation,
  PROCESS_SPELLS: processSpells,
  PROCESS_BATTLES: processBattles,
  SET_AGENT_CURRENT_ACTION: setAgentCurrentAction,
  PROCESS_EMPIRE_AIS: processEmpireAIs,
};
