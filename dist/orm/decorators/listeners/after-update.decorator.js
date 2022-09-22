"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AfterUpdate = void 0;
const orm_constant_1 = require("../../orm.constant");
const decorator_utils_1 = require("../../utils/decorator.utils");
function AfterUpdate() {
    return (target, propertyKey, descriptor) => {
        const hookFuncLikeArray = Reflect.getMetadata(orm_constant_1.AFTER_UPDATE, target) || [];
        hookFuncLikeArray.push(descriptor.value);
        Reflect.defineMetadata(orm_constant_1.AFTER_UPDATE, hookFuncLikeArray, target);
        const { after_update } = (0, decorator_utils_1.getOptions)(target);
        if (!after_update) {
            (0, decorator_utils_1.addOptions)(target, {
                before_save: (0, decorator_utils_1.addHookFunction)(target, orm_constant_1.AFTER_UPDATE),
            });
        }
        return descriptor;
    };
}
exports.AfterUpdate = AfterUpdate;
//# sourceMappingURL=after-update.decorator.js.map