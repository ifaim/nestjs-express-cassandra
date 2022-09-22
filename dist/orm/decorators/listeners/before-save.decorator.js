"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeforeSave = void 0;
const orm_constant_1 = require("../../orm.constant");
const decorator_utils_1 = require("../../utils/decorator.utils");
function BeforeSave() {
    return (target, propertyKey, descriptor) => {
        const hookFuncLikeArray = Reflect.getMetadata(orm_constant_1.BEFORE_SAVE, target) || [];
        hookFuncLikeArray.push(descriptor.value);
        Reflect.defineMetadata(orm_constant_1.BEFORE_SAVE, hookFuncLikeArray, target);
        const { before_save } = (0, decorator_utils_1.getOptions)(target);
        if (!before_save) {
            (0, decorator_utils_1.addOptions)(target, { before_save: (0, decorator_utils_1.addHookFunction)(target, orm_constant_1.BEFORE_SAVE) });
        }
        return descriptor;
    };
}
exports.BeforeSave = BeforeSave;
//# sourceMappingURL=before-save.decorator.js.map