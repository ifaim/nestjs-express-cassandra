"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityNotFoundError = void 0;
class EntityNotFoundError extends Error {
    constructor(entityClass, query) {
        super();
        this.name = 'apollo.model.find.entitynotfound';
        Object.setPrototypeOf(this, EntityNotFoundError.prototype);
        let targetName;
        if (typeof entityClass === 'function') {
            targetName = entityClass.name;
        }
        else {
            targetName = entityClass;
        }
        const queryString = this.stringifyQuery(query);
        this.message = `Could not find any entity of type "${targetName}" matching: ${queryString}`;
    }
    stringifyQuery(query) {
        try {
            return JSON.stringify(query, null, 4);
        }
        catch (e) { }
        return '' + query;
    }
}
exports.EntityNotFoundError = EntityNotFoundError;
//# sourceMappingURL=entity-not-found.error.js.map