import { conversionOptions } from '../constants';
import { ConversionCategoryType } from '../types';

// Converter will be created for each category change
class Converter {
  private options: (typeof conversionOptions)[ConversionCategoryType];
  constructor(type: ConversionCategoryType) {
    this.options = conversionOptions[type];
  }

  public convert(n: string, from: string, into: string): string {
    return this.toString(this.options.formulas[`${from}_to_${into}`](n));
  }

  private toString(n: number): string {
    return Intl.NumberFormat('fr-FR', {
      maximumFractionDigits: 3,
      minimumFractionDigits: 2,
    }).format(n);
  }
}

export { Converter };
