import { GameBlackboard } from '../core/blackboard';
import { Entity } from '../entities';
import { normalize } from '../helpers/math';
import { Curve } from './curve';
import { InputParameter } from './input-parameter';
import { InputValue } from './input-value';

// Can we have scorer with multiple inputs? Does it make sense?
export class Scorer {
  private curve: Curve;
  private inputParameter: InputParameter;

  constructor(inputParameter: InputParameter, curve: Curve) {
    this.inputParameter = inputParameter;
    this.curve = curve;
  }

  score<B extends GameBlackboard, E extends Entity>(
    inputValue: InputValue<B, E>
  ) {
    const rawValue = inputValue.getFrom(this.inputParameter);
    const normalizedValue = normalize(
      rawValue,
      this.inputParameter.min,
      this.inputParameter.max
    );
    const finalScore = this.curve.computeValue(normalizedValue);
    console.log('SCORER', this.inputParameter.name, {
      rawValue,
      normalizedValue,
      finalScore,
    });
    return finalScore;
  }
}
