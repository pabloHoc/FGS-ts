import { AddBuildingToQueue } from './add-building-to-queue';
import { BuildBuilding } from './build-building';
import { CreateAgent } from './create-agent';
import { CreateEmpire } from './create-empire';
import { CreateLand } from './create-land';
import { CreateRegion } from './create-region';
import { EndTurn } from './end-turn';
import { MoveAgent } from './move-agent';
import { ProcessAgentActions } from './process-agent-actions';
import { ProcessBuildingQueues } from './process-building-queues';
import { ProduceResources } from './produce-resources';
import { SetOwner } from './set-owner';
import { StartTurn } from './start-turn';

export interface Command {
  action: string;
}

// ! Create a command line for effects

export type Commands =
  | CreateEmpire
  | CreateLand
  | CreateRegion
  | CreateAgent
  | StartTurn
  | EndTurn
  | BuildBuilding
  | AddBuildingToQueue
  | SetOwner
  // Called each turn
  | ProcessAgentActions
  | ProcessBuildingQueues
  | ProduceResources
  // Agent actions
  | MoveAgent;
