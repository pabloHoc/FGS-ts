import { clamp } from '../helpers/math';

export type CurveType =
  | 'linear'
  | 'polinomial'
  | 'logistic'
  | 'log'
  | 'normal'
  | 'sine';

export class Curve {
  private type: CurveType;
  private slope: number;
  private exponent: number;
  private xShift: number;
  private yShift: number;

  constructor(
    type: CurveType,
    slope: number,
    exponent: number,
    xShift: number,
    yShift: number
  ) {
    this.type = type;
    this.slope = slope;
    this.exponent = exponent;
    this.xShift = xShift;
    this.yShift = yShift;
  }

  computeValue(x: number) {
    const { slope, exponent, xShift, yShift } = this;

    switch (this.type) {
      case 'linear':
        return clamp(slope * (x - xShift) + yShift);
      case 'polinomial':
        return clamp(slope * Math.pow(x - xShift, exponent) + yShift);
      case 'logistic':
        return clamp(
          slope / (1 + Math.exp(-10.0 * exponent * (x - 0.5 - xShift))) + yShift
        );
      case 'log':
        return clamp(
          (slope * Math.log((x - xShift) / (1.0 - (x - xShift)))) / 5.0 +
            0.5 +
            yShift
        );
      case 'normal':
        return clamp(
          slope *
            Math.exp(
              -30.0 * exponent * (x - xShift - 0.5) * (x - xShift - 0.5)
            ) +
            yShift
        );
      case 'sine':
        return clamp(
          0.5 * slope * Math.sin(2.0 * Math.PI * (x - xShift)) + 0.5 + yShift
        );
      default:
        throw Error('Invalid response curve type');
    }
  }
}
