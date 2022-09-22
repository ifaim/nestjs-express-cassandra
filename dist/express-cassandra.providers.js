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
exports.createExpressCassandraProviders = void 0;
const cassandra_orm_utils_1 = require("./utils/cassandra-orm.utils");
const rxjs_1 = require("rxjs");
const orm_1 = require("./orm");
const decorator_utils_1 = require("./orm/utils/decorator.utils");
const repository_factory_1 = require("./orm/repositories/repository.factory");
function createExpressCassandraProviders(entities, connection) {
    const providerModel = entity => ({
        provide: (0, cassandra_orm_utils_1.getModelToken)(entity),
        useFactory: (connectionLike) => __awaiter(this, void 0, void 0, function* () {
            return yield (0, rxjs_1.defer)(() => (0, orm_1.loadModel)(connectionLike, entity)).toPromise();
        }),
        inject: [(0, cassandra_orm_utils_1.getConnectionToken)(connection)],
    });
    const provideRepository = entity => ({
        provide: (0, cassandra_orm_utils_1.getRepositoryToken)(entity),
        useFactory: (model) => __awaiter(this, void 0, void 0, function* () { return repository_factory_1.RepositoryFactory.create(entity, model); }),
        inject: [(0, cassandra_orm_utils_1.getModelToken)(entity)],
    });
    const provideCustomRepository = EntityRepository => {
        const entity = (0, decorator_utils_1.getEntity)(EntityRepository);
        return {
            provide: (0, cassandra_orm_utils_1.getRepositoryToken)(EntityRepository),
            useFactory: (model) => __awaiter(this, void 0, void 0, function* () { return repository_factory_1.RepositoryFactory.create(entity, model, EntityRepository); }),
            inject: [(0, cassandra_orm_utils_1.getModelToken)(entity)],
        };
    };
    const providers = [];
    (entities || []).forEach(entity => {
        if (entity.prototype instanceof orm_1.Repository) {
            return providers.push(provideCustomRepository(entity));
        }
        return providers.push(providerModel(entity), provideRepository(entity));
    });
    return [...providers];
}
exports.createExpressCassandraProviders = createExpressCassandraProviders;
//# sourceMappingURL=express-cassandra.providers.js.map