import { BEFORE_SAVE } from '../../orm.constant';
import {
  addOptions,
  addHookFunction,
  getOptions,
} from '../../utils/decorator.utils';

export function BeforeSave(): MethodDecorator {
  return (
    target: object,
    propertyKey: string | Symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ) => {
    const hookFuncLikeArray = Reflect.getMetadata(BEFORE_SAVE, target) || [];
    hookFuncLikeArray.push(descriptor.value);
    Reflect.defineMetadata(BEFORE_SAVE, hookFuncLikeArray, target);

    const { before_save } = getOptions(target);
    if (!before_save) {
      addOptions(target, { before_save: addHookFunction(target, BEFORE_SAVE) });
    }
    return descriptor;
  };
}
