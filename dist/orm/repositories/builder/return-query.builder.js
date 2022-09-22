"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnQueryBuilder = void 0;
class ReturnQueryBuilder {
    constructor(model) {
        this.model = model;
    }
    save(model, options = {}) {
        return new this.model(model).save(Object.assign(Object.assign({}, options), { return_query: true }));
    }
    update(query = {}, updateValue, options = {}) {
        return this.model.update(query, updateValue, Object.assign(Object.assign({}, options), { return_query: true }));
    }
    delete(query = {}, options = {}) {
        return this.model.delete(query, Object.assign(Object.assign({}, options), { return_query: true }));
    }
}
exports.ReturnQueryBuilder = ReturnQueryBuilder;
//# sourceMappingURL=return-query.builder.js.map