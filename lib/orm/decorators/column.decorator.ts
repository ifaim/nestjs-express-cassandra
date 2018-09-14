import { ColumnOptions } from '../interfaces';
import { addAttribute } from '../utils/decorator.utils';

export function Column(options: ColumnOptions): PropertyDecorator {
  return (target: object, propertyName: string) => {
    // Reflect.defineMetadata(COLUMN_METADATA, options, target);
    addAttribute(target, propertyName, options);
  };
}
