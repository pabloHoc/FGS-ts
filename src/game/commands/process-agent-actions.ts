import { Command } from '.';

export interface ProcessAgentActions extends Command {
  action: 'PROCESS_AGENT_ACTIONS';
}

export const processAgentActions = (): ProcessAgentActions => ({
  action: 'PROCESS_AGENT_ACTIONS',
});
