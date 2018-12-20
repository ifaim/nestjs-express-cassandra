import { ColumnOptions } from '../interfaces';
import { addAttribute } from '../utils/decorator.utils';
import { BeforeSave } from './listeners';
import { uuid, timeuuid } from '../../';

export function Column(options: ColumnOptions): PropertyDecorator {
  return (target: object, propertyName: string) => {
    addAttribute(target, propertyName, options);
  };
}

export function PrimaryGeneratedColumn(
  type: 'uuid' | 'timeuuid' = 'uuid',
): PropertyDecorator {
  return (target: object, propertyName: string) => {
    const fn: PropertyDescriptor = {
      value: (...args: any[]) => {
        const instance = args[0];
        if (!instance[propertyName]) {
          instance[propertyName] = type === 'uuid' ? uuid() : timeuuid();
        }
      },
    };
    Column({
      type,
      default: { $db_function: type === 'uuid' ? 'uuid()' : 'now()' },
    })(target, propertyName);
    BeforeSave()(target, propertyName, fn);
  };
}
