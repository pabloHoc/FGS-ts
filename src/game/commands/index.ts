import { AddBuildingToQueue } from './add-building-to-queue';
import { BuildBuilding } from './build-building';
import { CreateAgent } from './create-agent';
import { CreateArmy } from './create-army';
import { CreateEmpire } from './create-empire';
import { CreateLand } from './create-land';
import { CreatePlayer } from './create-player';
import { CreateRegion } from './create-region';
import { EndTurn } from './end-turn';
import { ProcessAgentActions } from './process-agent-actions';
import { ProcessBattles } from './process-battles';
import { ProcessBuildingQueues } from './process-building-queues';
import { ProcessPlayerAIs } from './process-player-ais';
import { ProcessSpells } from './process-spells';
import { ProduceResources } from './produce-resources';
import { SetAgentCurrentAction } from './set-agent-current-action';
import { SetLocation } from './set-location';
import { SetOwner } from './set-owner';
import { StartTurn } from './start-turn';

export interface Command {
  action: string;
}

// TODO: Create a command line tool for commands

export type Commands =
  | CreatePlayer
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
  | ProcessPlayerAIs
  | ProcessSpells
  | ProcessBattles
  | ProcessAgentActions
  | ProcessBuildingQueues
  | ProduceResources
  // Agent actions
  | SetLocation
  | SetAgentCurrentAction;
