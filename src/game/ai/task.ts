import { Entity } from '../entities';
import { Blackboard } from './blackboard';

export enum TaskType {
  Primitive = 'Primitive',
  Complex = 'Complex',
}

export interface Task<B extends Blackboard, E extends Entity> {
  name: string;
  type: TaskType;
  isValid: (context: B, entity: E) => boolean;
  computeScore: (context: B, entity: E) => void;
  getScore: () => number;
}
