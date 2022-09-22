"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeforeUpdate = void 0;
const orm_constant_1 = require("../../orm.constant");
const decorator_utils_1 = require("../../utils/decorator.utils");
function BeforeUpdate() {
    return (target, propertyKey, descriptor) => {
        const hookFuncLikeArray = Reflect.getMetadata(orm_constant_1.BEFORE_UPDATE, target) || [];
        hookFuncLikeArray.push(descriptor.value);
        Reflect.defineMetadata(orm_constant_1.BEFORE_UPDATE, hookFuncLikeArray, target);
        const { before_update } = (0, decorator_utils_1.getOptions)(target);
        if (!before_update) {
            (0, decorator_utils_1.addOptions)(target, {
                before_save: (0, decorator_utils_1.addHookFunction)(target, orm_constant_1.BEFORE_UPDATE),
            });
        }
        return descriptor;
    };
}
exports.BeforeUpdate = BeforeUpdate;
//# sourceMappingURL=before-update.decorator.js.map