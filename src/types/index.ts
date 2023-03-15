export type ConversionCategoryType =
  | 'temperature'
  | 'distance'
  | 'area'
  | 'volume'
  | 'weight'
  | 'time';

export type TemperatureUnit = 'celsius' | 'farenheit' | 'kelvin';

export type DistanceUnit =
  | 'meter'
  | 'kilometer'
  | 'centimeter'
  | 'millimeter'
  | 'micrometer'
  | 'nanometer'
  | 'mile'
  | 'yard'
  | 'foot'
  | 'inch'
  | 'light_year';

export type AreaUnit =
  | 'square_meter'
  | 'square_kilometer'
  | 'square_centimeter'
  | 'square_millimeter'
  | 'square_micrometer'
  | 'hectare'
  | 'square_mile'
  | 'square_yard'
  | 'square_foot'
  | 'square_inch'
  | 'acre';

export type VolumeUnit =
  | 'cubic_meter'
  | 'cubic_kilometer'
  | 'cubic_centimeter'
  | 'cubic_millimeter'
  | 'liter'
  | 'milliliter'
  | 'us_gallon'
  | 'us_quart'
  | 'us_pint'
  | 'us_cup'
  | 'us_fluid_ounce'
  | 'us_table_spoon'
  | 'us_tea_spoon'
  | 'imperial_gallon'
  | 'imperial_quart'
  | 'imperial_pint'
  | 'imperial_fluid_ounce'
  | 'imperial_table_spoon'
  | 'imperial_tea_spoon'
  | 'cubic_mile'
  | 'cubic_yard'
  | 'cubic_foot'
  | 'cubic_inch';

export type WeightUnit =
  | 'kilogram'
  | 'gram'
  | 'milligram'
  | 'metric_ton'
  | 'long_ton'
  | 'short_ton'
  | 'pound'
  | 'ounce'
  | 'carrat'
  | 'atomic_mass_unit'
  | 'kilogram'
  | 'gram'
  | 'milligram'
  | 'metric_ton'
  | 'long_ton'
  | 'short_ton'
  | 'pound'
  | 'ounce'
  | 'carrat'
  | 'atomic_mass_unit';

export type TimeUnit =
  | 'second'
  | 'millisecond'
  | 'microsecond'
  | 'nanosecond'
  | 'picosecond'
  | 'minute'
  | 'hour'
  | 'day'
  | 'week'
  | 'month'
  | 'year'
  | 'second'
  | 'millisecond'
  | 'microsecond'
  | 'nanosecond'
  | 'picosecond'
  | 'minute'
  | 'hour'
  | 'day'
  | 'week'
  | 'month'
  | 'year';

export type Duplicates<T extends string> = T extends T ? `${T}_to_${T}` : never;

export type ConversionUnit =
  | TemperatureUnit
  | DistanceUnit
  | AreaUnit
  | VolumeUnit
  | WeightUnit
  | TimeUnit;

export type Formula<T extends ConversionUnit> = Omit<
  {
    [U in `${T}_to_${T}`]: (n: number) => number;
  },
  Duplicates<T>
>;

export type ConversionsOptions<T extends ConversionUnit> = {
  key: ConversionCategoryType;
  approx?: Array<keyof Formula<T>>;
  items: Array<T>;
  formulas: Formula<T>;
};
