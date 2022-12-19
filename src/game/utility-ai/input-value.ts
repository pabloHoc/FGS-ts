import { Blackboard } from './blackboard';
import { InputParameter } from './input-parameter';

export class InputValue<Context extends Blackboard, Target> {
  private context: Context;
  private target: Target;

  constructor(context: Context, target: Target) {
    this.context = context;
    this.target = target;
  }

  getFrom(inputParams: InputParameter) {
    return this.context.getInputValue(this.target, inputParams.name);
  }
}
