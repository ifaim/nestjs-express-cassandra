"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
const decorator_utils_1 = require("../utils/decorator.utils");
function Entity(nameOrOptions, maybeOptions) {
    const options = (typeof nameOrOptions === 'object'
        ? nameOrOptions
        : maybeOptions) || {};
    const name = typeof nameOrOptions === 'string' ? nameOrOptions : options.table_name;
    return (target) => {
        options.instanceMethods = target.prototype;
        options.classMethods = target;
        (0, decorator_utils_1.setEntityName)(target.prototype, name);
        (0, decorator_utils_1.addOptions)(target.prototype, options);
    };
}
exports.Entity = Entity;
//# sourceMappingURL=entity.decorator.js.map