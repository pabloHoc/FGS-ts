import { GameBlackboard } from '../core/blackboard';
import { Entity } from '../entities';
import { InputParameter } from './input-parameter';
import { getInputValue } from './inputs';

export class InputValue<B extends GameBlackboard, E extends Entity> {
  private context: B;
  private entity: E;

  constructor(context: B, entity: E) {
    this.context = context;
    this.entity = entity;
  }

  getFrom(inputParams: InputParameter) {
    return getInputValue(this.context, this.entity, inputParams.name);
  }
}
