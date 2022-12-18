import { Definition } from '.';
import { Curve, CurveType } from '../ai/curve';
import { InputParameter } from '../ai/input-parameter';
import { InputValue } from '../ai/input-value';
import { Scorer } from '../ai/scorer';

interface IScorerDefinition extends Definition {
  type: 'SCORER';
  name: string;
  curve: string;
  input: {
    name: string;
    min: number;
    max: number;
  };
}

export class ScorerDefinition implements IScorerDefinition {
  readonly type = 'SCORER';
  readonly name: string;
  readonly curve: string;
  readonly input: {
    name: string;
    min: number;
    max: number;
  };
  readonly scorer: Scorer;

  constructor(definition: IScorerDefinition) {
    this.name = definition.name;
    this.curve = definition.curve;
    this.input = definition.input;

    // Curve
    const [curveType, slope, exponent, xShift, yShift] = this.curve.split(' ');
    const responseCurve = new Curve(
      curveType as CurveType,
      Number(slope),
      Number(exponent),
      Number(xShift),
      Number(yShift)
    );

    this.scorer = new Scorer(this.input, responseCurve);
  }
}
