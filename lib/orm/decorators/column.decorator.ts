import { ColumnOptions } from '../interfaces';
import { addAttribute } from '../utils/decorator.utils';

export function Column(options: ColumnOptions): PropertyDecorator {
  return (target: object, propertyName: string) => {
    addAttribute(target, propertyName, options);
  };
}
