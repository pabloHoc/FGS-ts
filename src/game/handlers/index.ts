import { Commands } from '../commands';
import { EndTurn } from '../commands/end-turn';
import { Handlers } from '../core/dispatcher';
import { moveAgent } from './move-agent';

export const HANDLERS: Handlers<Commands> = {
  MOVE_AGENT: moveAgent,
};
