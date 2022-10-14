import { BuildBuilding } from './build-building';
import { EndTurn } from './end-turn';
import { MoveAgent } from './move-agent';
import { SelectAgent } from './select-agent';
import { SelectLand } from './select-land';
import { SelectRegion } from './select-region';
import { StartTurn } from './start-turn';
import { UpdateResources } from './update-resources';

export interface Command {
  action: string;
}

// Commands executed from the UI
type UICommands =
  | EndTurn
  | SelectRegion
  | SelectLand
  | SelectAgent
  | BuildBuilding
  | MoveAgent;

// ECommands executed from the game backend
type GameCommands = StartTurn | UpdateResources;

export type Commands = MoveAgent; //| MoveAgent | BuildBuilding;
