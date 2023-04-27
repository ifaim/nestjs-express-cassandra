import { AFTER_DELETE } from '../../orm.constant';
import { addOptions, addHookFunction, getOptions } from '../../utils/decorator.utils';

export function AfterDelete(): MethodDecorator {
  return (target: object, propertyKey: string | Symbol, descriptor: TypedPropertyDescriptor<any>) => {
    const hookFuncLikeArray = Reflect.getMetadata(AFTER_DELETE, target) || [];
    hookFuncLikeArray.push(descriptor.value);
    Reflect.defineMetadata(AFTER_DELETE, hookFuncLikeArray, target);

    const { after_delete } = getOptions(target);
    if (!after_delete) {
      addOptions(target, {
        before_save: addHookFunction(target, AFTER_DELETE),
      });
    }
    return descriptor;
  };
}
