import { BuildBuilding } from './build-building';
import { EndTurn } from './end-turn';
import { MoveAgent } from './move-agent';
import { SelectAgent } from './select-agent';
import { SelectLand } from './select-land';
import { SelectRegion } from './select-region';
import { StartTurn } from './start-turn';
import { UpdateResources } from './update-resources';

// Events triggered by the UI
type UIEvents =
  | EndTurn
  | SelectRegion
  | SelectLand
  | SelectAgent
  | BuildBuilding
  | MoveAgent;

// Events triggered by the game backend
type GameEvents = StartTurn | UpdateResources;

export type Events = UIEvents | GameEvents;
