import { Command } from '.';

export interface ProcessBuildingQueues extends Command {
  action: 'PROCESS_BUILDING_QUEUES';
}

export const processBuildingQueues = (): ProcessBuildingQueues => ({
  action: 'PROCESS_BUILDING_QUEUES',
});
