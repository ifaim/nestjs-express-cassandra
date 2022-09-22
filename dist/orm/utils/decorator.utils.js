"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addHookFunction = exports.addOptions = exports.setOptions = exports.getOptions = exports.addAttributeOptions = exports.addAttribute = exports.setAttributes = exports.getAttributes = exports.getEntityName = exports.setEntityName = exports.getEntity = exports.setEntity = void 0;
require("reflect-metadata");
const orm_constant_1 = require("../orm.constant");
const deep_merge_utils_1 = require("./deep-merge.utils");
function setEntity(target, entity) {
    Reflect.defineMetadata(orm_constant_1.ENTITY_METADATA, entity, target);
}
exports.setEntity = setEntity;
function getEntity(target) {
    return Reflect.getMetadata(orm_constant_1.ENTITY_METADATA, target);
}
exports.getEntity = getEntity;
function setEntityName(target, modelName) {
    Reflect.defineMetadata(orm_constant_1.ENTITY_NAME_KEY, modelName, target);
}
exports.setEntityName = setEntityName;
function getEntityName(target) {
    return Reflect.getMetadata(orm_constant_1.ENTITY_NAME_KEY, target);
}
exports.getEntityName = getEntityName;
function getAttributes(target) {
    const attributes = Reflect.getMetadata(orm_constant_1.ATTRUBUTE_KEY, target);
    if (attributes) {
        return Object.keys(attributes).reduce((copy, key) => {
            copy[key] = Object.assign({}, attributes[key]);
            return copy;
        }, {});
    }
}
exports.getAttributes = getAttributes;
function setAttributes(target, attributes) {
    Reflect.defineMetadata(orm_constant_1.ATTRUBUTE_KEY, Object.assign({}, attributes), target);
}
exports.setAttributes = setAttributes;
function addAttribute(target, name, options) {
    const attributes = getAttributes(target) || {};
    attributes[name] = Object.assign({}, options);
    setAttributes(target, attributes);
}
exports.addAttribute = addAttribute;
function addAttributeOptions(target, propertyName, options) {
    const attributes = getAttributes(target);
    attributes[propertyName] = (0, deep_merge_utils_1.mergeDeep)(attributes[propertyName], options);
    setAttributes(target, attributes);
}
exports.addAttributeOptions = addAttributeOptions;
function getOptions(target) {
    const options = Reflect.getMetadata(orm_constant_1.OPTIONS_KEY, target);
    return Object.assign({}, options) || {};
}
exports.getOptions = getOptions;
function setOptions(target, options) {
    Reflect.defineMetadata(orm_constant_1.OPTIONS_KEY, Object.assign({}, options), target);
}
exports.setOptions = setOptions;
function addOptions(target, options) {
    const mOptions = getOptions(target) || {};
    setOptions(target, (0, deep_merge_utils_1.mergeDeep)(mOptions, options));
}
exports.addOptions = addOptions;
const addHookFunction = (target, metadataKey) => {
    const funcLikeArray = Reflect.getMetadata(metadataKey, target) || [];
    return (...args) => funcLikeArray.map(funcLike => funcLike(...args));
};
exports.addHookFunction = addHookFunction;
//# sourceMappingURL=decorator.utils.js.map