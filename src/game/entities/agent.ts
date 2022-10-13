import { Entity, EntityId } from '.';

interface MoveAction {
  name: 'MOVE';
  payload: {
    from: EntityId;
    to: EntityId;
  };
  remainingTurns: number;
}

type AgentAction = MoveAction;

export interface Agent extends Entity {
  type: 'AGENT';
  name: string;
  empireId: string;
  // Current location
  regionId: string;
  currentAction: AgentAction;
}

export const createAgent = (
  name: string,
  empireId: EntityId,
  regionId: EntityId
) => {};
