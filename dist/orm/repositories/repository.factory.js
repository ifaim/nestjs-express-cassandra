"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryFactory = void 0;
const repository_1 = require("./repository");
const return_query_builder_1 = require("./builder/return-query.builder");
class RepositoryFactory {
    static create(entity, model, EntityRepository = repository_1.Repository) {
        const repository = new EntityRepository();
        const returnQueryBuilder = new return_query_builder_1.ReturnQueryBuilder(model);
        Object.assign(repository, { target: entity, model, returnQueryBuilder });
        return repository;
    }
}
exports.RepositoryFactory = RepositoryFactory;
//# sourceMappingURL=repository.factory.js.map