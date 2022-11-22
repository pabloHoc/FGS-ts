import { AddBuildingToQueue } from './add-building-to-queue';
import { BuildBuilding } from './build-building';
import { CreateAgent } from './create-agent';
import { CreateArmy } from './create-army';
import { CreateEmpire } from './create-empire';
import { CreateLand } from './create-land';
import { CreateRegion } from './create-region';
import { EndTurn } from './end-turn';
import { ProcessAgentActions } from './process-agent-actions';
import { ProcessBuildingQueues } from './process-building-queues';
import { ProcessSpells } from './process-spells';
import { ProduceResources } from './produce-resources';
import { SetLocation } from './set-location';
import { SetOwner } from './set-owner';
import { StartTurn } from './start-turn';

export interface Command {
  action: string;
}

// TODO: Create a command line tool for commands

export type Commands =
  | CreateEmpire
  | CreateLand
  | CreateRegion
  | CreateAgent
  | CreateArmy
  | StartTurn
  | EndTurn
  | BuildBuilding
  | AddBuildingToQueue
  | SetOwner
  // Called each turn
  | ProcessSpells
  | ProcessAgentActions
  | ProcessBuildingQueues
  | ProduceResources
  // Agent actions
  | SetLocation;
