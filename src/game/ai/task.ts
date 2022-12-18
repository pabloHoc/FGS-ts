import { Entity } from '../entities';
import { Blackboard } from './blackboard';

export interface Task<B extends Blackboard, E extends Entity> {
  readonly name: string;
  isValid: (context: B, entity: E) => boolean;
  computeScore: (context: B, entity: E) => void;
  getScore: () => number;
}
