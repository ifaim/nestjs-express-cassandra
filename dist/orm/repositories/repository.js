"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repository = void 0;
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const transform_entity_utils_1 = require("../utils/transform-entity.utils");
const errors_1 = require("../errors");
const defaultOptions = {
    findOptions: { raw: true },
    updateOptions: { if_exists: true },
    deleteOptions: { if_exists: true },
};
class Repository {
    create(entityLike) {
        return (0, transform_entity_utils_1.transformEntity)(this.target, entityLike);
    }
    findOne(query, options = {}) {
        return (0, rxjs_1.defer)(() => this.model.findOneAsync(query, Object.assign(Object.assign({}, options), defaultOptions.findOptions))).pipe((0, operators_1.map)(x => x && (0, transform_entity_utils_1.transformEntity)(this.target, x)));
    }
    findOneOrFail(query, maybeOptions = {}) {
        return this.findOne(query, maybeOptions).pipe((0, operators_1.map)(entity => {
            if (entity === undefined) {
                throw new errors_1.EntityNotFoundError(this.target, query);
            }
            return entity;
        }));
    }
    find(query, options = {}) {
        return (0, rxjs_1.defer)(() => this.model.findAsync(query, Object.assign(Object.assign({}, options), defaultOptions.findOptions))).pipe((0, operators_1.map)(x => (0, transform_entity_utils_1.transformEntity)(this.target, x)));
    }
    findAndCount(query, options = {}) {
        return (0, rxjs_1.defer)(() => this.model.findAsync(query, Object.assign(Object.assign({}, options), defaultOptions.findOptions))).pipe((0, operators_1.map)(x => (0, transform_entity_utils_1.transformEntity)(this.target, x)), (0, operators_1.map)(entities => [entities, entities.length]));
    }
    save(entityLike, options = {}) {
        const saveFunc = (entity) => __awaiter(this, void 0, void 0, function* () {
            const model = new this.model(entity);
            yield model.saveAsync(options);
            return (0, transform_entity_utils_1.transformEntity)(this.target, model.toJSON());
        });
        const saveMultipleFunc = (arrayLike) => Promise.all(arrayLike.map(x => saveFunc(x)));
        return Array.isArray(entityLike)
            ? (0, rxjs_1.defer)(() => saveMultipleFunc(entityLike))
            : (0, rxjs_1.defer)(() => saveFunc(entityLike));
    }
    update(query, updateValue, options = {}) {
        return (0, rxjs_1.defer)(() => this.model.updateAsync(query, updateValue, Object.assign(Object.assign({}, defaultOptions.updateOptions), options)));
    }
    remove(entityOrEntities, options = {}) {
        const removeFunc = entity => new this.model(entity).deleteAsync(Object.assign(Object.assign({}, defaultOptions.deleteOptions), options));
        const promiseArray = entityOrEntities instanceof Array
            ? entityOrEntities.map(x => removeFunc(x))
            : [removeFunc(entityOrEntities)];
        return (0, rxjs_1.defer)(() => Promise.all(promiseArray)).pipe((0, operators_1.map)(() => entityOrEntities));
    }
    delete(query = {}, options = {}) {
        return (0, rxjs_1.defer)(() => this.model.deleteAsync(query, Object.assign(Object.assign({}, defaultOptions.deleteOptions), options)));
    }
    truncate() {
        return (0, rxjs_1.defer)(() => this.model.truncateAsync());
    }
    stream(query, options = {}) {
        const reader$ = new rxjs_1.Subject();
        const onRead = (reader) => {
            while (true) {
                const row = reader.readRow();
                if (row === null) {
                    break;
                }
                reader$.next((0, transform_entity_utils_1.transformEntity)(this.target, row));
            }
        };
        const onDone = (error) => {
            if (error) {
                reader$.error(error);
            }
            reader$.complete();
            return;
        };
        this.model.stream(query, Object.assign(Object.assign({}, options), defaultOptions.findOptions), onRead, onDone);
        return reader$.asObservable();
    }
    eachRow(query, options = {}) {
        const reader$ = new rxjs_1.Subject();
        const done$ = new rxjs_1.Subject();
        const getReader = () => reader$.asObservable();
        const getDone = () => done$.asObservable();
        const onRow = (n, row) => reader$.next((0, transform_entity_utils_1.transformEntity)(this.target, row));
        const onDone = (err, result) => {
            if (err) {
                reader$.error(err);
                done$.error(err);
            }
            else {
                done$.next(result);
            }
            reader$.complete();
            done$.complete();
        };
        this.model.eachRow(query, Object.assign(Object.assign({}, options), defaultOptions.findOptions), onRow, onDone);
        return { getReader, getDone };
    }
    get getModelRef() {
        return this.model;
    }
    getReturnQueryBuilder() {
        return this.returnQueryBuilder;
    }
    doBatch(queries) {
        return this.model.execute_batchAsync(queries);
    }
}
exports.Repository = Repository;
//# sourceMappingURL=repository.js.map