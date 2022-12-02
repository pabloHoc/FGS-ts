import { Entity } from '../entities';
import { Blackboard } from './blackboard';

export abstract class Scorer<B extends Blackboard, E extends Entity> {
  score(context: B, entity: E) {
    return 1;
  }
}
