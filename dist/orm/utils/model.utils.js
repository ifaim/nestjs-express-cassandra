"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSchema = exports.loadModel = void 0;
const decorator_utils_1 = require("./decorator.utils");
const common_1 = require("@nestjs/common");
function loadModel(connection, entity) {
    const schema = getSchema(entity);
    const modelName = entity.name || entity.table_name;
    const model = connection.loadSchema(modelName, schema);
    return new Promise(resolve => {
        model.syncDB(err => {
            if (err) {
                common_1.Logger.error(err.message, err.stack, 'ExpressCassandraModule');
                return resolve(model);
            }
            return resolve(model);
        });
    });
}
exports.loadModel = loadModel;
function getSchema(entity) {
    const attributes = (0, decorator_utils_1.getAttributes)(entity.prototype);
    const _a = (0, decorator_utils_1.getOptions)(entity.prototype), { instanceMethods, classMethods } = _a, options = __rest(_a, ["instanceMethods", "classMethods"]);
    const model = Object.assign({}, options);
    model.fields = Object.assign({}, attributes);
    return model;
}
exports.getSchema = getSchema;
//# sourceMappingURL=model.utils.js.map