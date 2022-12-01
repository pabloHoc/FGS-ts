import { Entity } from '../entities';
import { Blackboard } from './blackboard';

export enum TaskType {
  Primitive = 'Primitive',
  Compound = 'Compound',
}

export interface Task<B extends Blackboard, E extends Entity> {
  name: string;
  type: TaskType;
  isValid: (context: B, entity: E) => boolean;
}
