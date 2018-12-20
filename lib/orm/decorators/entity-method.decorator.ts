import { getOptions, addOptions } from '../utils/decorator.utils';

export function EntityMethod(): MethodDecorator {
  return (
    target: object,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<any>,
  ) => {
    let { methods } = getOptions(target);
    methods = methods || {};
    methods[propertyKey] = descriptor.value;
    addOptions(target, { methods });
    return descriptor;
  };
}
