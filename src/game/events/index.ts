import { BuildBuilding } from './build-building';
import { EndTurn } from './end-turn';
import { SelectLand } from './select-land';
import { SelectRegion } from './select-region';
import { StartTurn } from './start-turn';
import { UpdateResources } from './update-resources';

// Events triggered by the UI
type UIEvents = EndTurn | SelectRegion | SelectLand | BuildBuilding;

// Events triggered by the game backend
type GameEvents = StartTurn | UpdateResources;

export type Events = UIEvents | GameEvents;
