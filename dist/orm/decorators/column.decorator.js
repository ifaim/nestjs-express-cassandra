"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexColumn = exports.UpdateDateColumn = exports.CreateDateColumn = exports.VersionColumn = exports.GeneratedUUidColumn = exports.Column = void 0;
const decorator_utils_1 = require("../utils/decorator.utils");
const listeners_1 = require("./listeners");
const db_utils_1 = require("../utils/db.utils");
function Column(options) {
    return (target, propertyName) => {
        (0, decorator_utils_1.addAttribute)(target, propertyName, options);
    };
}
exports.Column = Column;
function GeneratedUUidColumn(type = 'uuid') {
    return (target, propertyName) => {
        const fn = {
            value: (...args) => {
                const instance = args[0];
                if (instance !== null && !instance[propertyName]) {
                    instance[propertyName] = type === 'timeuuid' ? (0, db_utils_1.timeuuid)() : (0, db_utils_1.uuid)();
                }
            },
        };
        Column({
            type,
            default: { $db_function: type === 'timeuuid' ? 'now()' : 'uuid()' },
        })(target, propertyName);
        (0, listeners_1.BeforeSave)()(target, propertyName, fn);
    };
}
exports.GeneratedUUidColumn = GeneratedUUidColumn;
function VersionColumn() {
    return (target, propertyName) => {
        (0, decorator_utils_1.addOptions)(target, { options: { versions: { key: propertyName } } });
    };
}
exports.VersionColumn = VersionColumn;
function CreateDateColumn() {
    return (target, propertyName) => {
        (0, decorator_utils_1.addOptions)(target, {
            options: { timestamps: { createdAt: propertyName } },
        });
    };
}
exports.CreateDateColumn = CreateDateColumn;
function UpdateDateColumn() {
    return (target, propertyName) => {
        (0, decorator_utils_1.addOptions)(target, {
            options: { timestamps: { updatedAt: propertyName } },
        });
    };
}
exports.UpdateDateColumn = UpdateDateColumn;
function IndexColumn() {
    return (target, propertyName) => {
        let { indexes } = (0, decorator_utils_1.getOptions)(target);
        indexes = indexes || [];
        const isAdded = indexes.some(value => value === propertyName);
        if (isAdded) {
            return;
        }
        indexes.push(propertyName);
        (0, decorator_utils_1.addOptions)(target, { indexes });
    };
}
exports.IndexColumn = IndexColumn;
//# sourceMappingURL=column.decorator.js.map