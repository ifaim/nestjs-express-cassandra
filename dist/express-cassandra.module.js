"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ExpressCassandraModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressCassandraModule = void 0;
const common_1 = require("@nestjs/common");
const express_casandra_core_module_1 = require("./express-casandra-core.module");
const express_cassandra_providers_1 = require("./express-cassandra.providers");
let ExpressCassandraModule = ExpressCassandraModule_1 = class ExpressCassandraModule {
    static forRoot(options) {
        return {
            module: ExpressCassandraModule_1,
            imports: [express_casandra_core_module_1.ExpressCassandraCoreModule.forRoot(options)],
        };
    }
    static forFeature(entities = [], connection = 'default') {
        const providers = (0, express_cassandra_providers_1.createExpressCassandraProviders)(entities, connection);
        return {
            module: ExpressCassandraModule_1,
            providers,
            exports: providers,
        };
    }
    static forRootAsync(options) {
        return {
            module: ExpressCassandraModule_1,
            imports: [express_casandra_core_module_1.ExpressCassandraCoreModule.forRootAsync(options)],
        };
    }
};
ExpressCassandraModule = ExpressCassandraModule_1 = __decorate([
    (0, common_1.Module)({})
], ExpressCassandraModule);
exports.ExpressCassandraModule = ExpressCassandraModule;
//# sourceMappingURL=express-cassandra.module.js.map