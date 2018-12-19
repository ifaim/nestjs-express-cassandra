import { EntityOptions } from '../interfaces';
import { setEntityName, addOptions } from '../utils/decorator.utils';

export function Entity<T = any>(options?: EntityOptions<T>): ClassDecorator;
export function Entity<T = any>(
  name?: string,
  options?: EntityOptions<T>,
): ClassDecorator;
export function Entity(
  nameOrOptions?: string | EntityOptions,
  maybeOptions?: EntityOptions,
): ClassDecorator {
  const options: any =
    (typeof nameOrOptions === 'object'
      ? (nameOrOptions as EntityOptions)
      : maybeOptions) || {};
  const name =
    typeof nameOrOptions === 'string' ? nameOrOptions : options.table_name;

  return (target): void => {
    options.instanceMethods = target.prototype;
    options.classMethods = target;

    setEntityName(target.prototype, name);
    addOptions(target.prototype, options);
  };
}
