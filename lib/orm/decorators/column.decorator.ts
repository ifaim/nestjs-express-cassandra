import { ColumnOptions } from '../interfaces';
import { addAttribute, addOptions, getOptions } from '../utils/decorator.utils';
import { BeforeSave } from './listeners';
import { uuid, timeuuid } from '../utils/db.utils';

export function Column(options: ColumnOptions): PropertyDecorator {
  return (target: object, propertyName: string) => {
    addAttribute(target, propertyName, options);
  };
}

export function GeneratedUUidColumn(
  type: 'uuid' | 'timeuuid' = 'uuid',
): PropertyDecorator {
  return (target: object, propertyName: string) => {
    const fn: PropertyDescriptor = {
      value: (...args: any[]) => {
        const instance = args[0];
        if (instance !== null && !instance[propertyName]) {
          instance[propertyName] = type === 'timeuuid' ? timeuuid() : uuid();
        }
      },
    };

    Column({
      type,
      default: { $db_function: type === 'timeuuid' ? 'now()' : 'uuid()' },
    })(target, propertyName);
    BeforeSave()(target, propertyName, fn);
  };
}

export function VersionColumn(): PropertyDecorator {
  return (target: object, propertyName: string) => {
    addOptions(target, { options: { versions: { key: propertyName } } });
  };
}

export function CreateDateColumn(): PropertyDecorator {
  return (target: object, propertyName: string) => {
    addOptions(target, {
      options: { timestamps: { createdAt: propertyName } },
    });
  };
}

export function UpdateDateColumn(): PropertyDecorator {
  return (target: object, propertyName: string) => {
    addOptions(target, {
      options: { timestamps: { updatedAt: propertyName } },
    });
  };
}

export function IndexColumn(): PropertyDecorator {
  return (target: object, propertyName: string) => {
    let { indexes } = getOptions(target);
    indexes = indexes || [];

    const isAdded = (indexes as string[]).some(value => value === propertyName);
    if (isAdded) {
      return;
    }

    indexes.push(propertyName);
    addOptions(target, { indexes });
  };
}
