"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AfterSave = void 0;
const orm_constant_1 = require("../../orm.constant");
const decorator_utils_1 = require("../../utils/decorator.utils");
function AfterSave() {
    return (target, propertyKey, descriptor) => {
        const hookFuncLikeArray = Reflect.getMetadata(orm_constant_1.AFTER_SAVE, target) || [];
        hookFuncLikeArray.push(descriptor.value);
        Reflect.defineMetadata(orm_constant_1.AFTER_SAVE, hookFuncLikeArray, target);
        const { after_save } = (0, decorator_utils_1.getOptions)(target);
        if (!after_save) {
            (0, decorator_utils_1.addOptions)(target, { after_save: (0, decorator_utils_1.addHookFunction)(target, orm_constant_1.AFTER_SAVE) });
        }
        return descriptor;
    };
}
exports.AfterSave = AfterSave;
//# sourceMappingURL=after-save.decorator.js.map