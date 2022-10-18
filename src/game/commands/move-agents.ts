import { Command } from '.';

export interface MoveAgents extends Command {
  action: 'MOVE_AGENTS';
}

export const moveAgents = (): MoveAgents => ({
  action: 'MOVE_AGENTS',
});
