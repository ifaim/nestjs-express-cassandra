"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
var ExpressCassandraCoreModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressCassandraCoreModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const express_cassandra_constant_1 = require("./express-cassandra.constant");
const cassandra_orm_utils_1 = require("./utils/cassandra-orm.utils");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const orm_1 = require("./orm");
let ExpressCassandraCoreModule = ExpressCassandraCoreModule_1 = class ExpressCassandraCoreModule {
    constructor(options, moduleRef) {
        this.options = options;
        this.moduleRef = moduleRef;
    }
    static forRoot(options = {}) {
        const expressModuleOptions = {
            provide: express_cassandra_constant_1.EXPRESS_CASSANDRA_MODULE_OPTIONS,
            useValue: options,
        };
        const connectionProvider = {
            provide: (0, cassandra_orm_utils_1.getConnectionToken)(options),
            useFactory: () => __awaiter(this, void 0, void 0, function* () { return yield this.createConnectionFactory(options); }),
        };
        return {
            module: ExpressCassandraCoreModule_1,
            providers: [expressModuleOptions, connectionProvider],
            exports: [connectionProvider],
        };
    }
    static forRootAsync(options) {
        const connectionProvider = {
            provide: (0, cassandra_orm_utils_1.getConnectionToken)(options),
            useFactory: (typeormOptions) => __awaiter(this, void 0, void 0, function* () {
                if (options.name) {
                    return yield this.createConnectionFactory(Object.assign(Object.assign({}, typeormOptions), { name: options.name }));
                }
                return yield this.createConnectionFactory(typeormOptions);
            }),
            inject: [express_cassandra_constant_1.EXPRESS_CASSANDRA_MODULE_OPTIONS],
        };
        const asyncProviders = this.createAsyncProviders(options);
        return {
            module: ExpressCassandraCoreModule_1,
            imports: options.imports,
            providers: [
                ...asyncProviders,
                connectionProvider,
                {
                    provide: express_cassandra_constant_1.EXPRESS_CASSANDRA_MODULE_ID,
                    useValue: (0, cassandra_orm_utils_1.generateString)(),
                },
            ],
            exports: [connectionProvider],
        };
    }
    onModuleDestroy() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.options.keepConnectionAlive) {
                return;
            }
            common_1.Logger.log('Closing connection', 'ExpressCassandraModule');
            const connection = this.moduleRef.get((0, cassandra_orm_utils_1.getConnectionToken)(this
                .options));
            connection && (yield connection.closeAsync());
        });
    }
    static createAsyncProviders(options) {
        if (options.useExisting || options.useFactory) {
            return [this.createAsyncOptionsProvider(options)];
        }
        return [
            this.createAsyncOptionsProvider(options),
            {
                provide: options.useClass,
                useClass: options.useClass,
            },
        ];
    }
    static createAsyncOptionsProvider(options) {
        if (options.useFactory) {
            return {
                provide: express_cassandra_constant_1.EXPRESS_CASSANDRA_MODULE_OPTIONS,
                useFactory: options.useFactory,
                inject: options.inject || [],
            };
        }
        return {
            provide: express_cassandra_constant_1.EXPRESS_CASSANDRA_MODULE_OPTIONS,
            useFactory: (optionsFactory) => __awaiter(this, void 0, void 0, function* () { return yield optionsFactory.createExpressCassandraOptions(); }),
            inject: [options.useClass || options.useExisting],
        };
    }
    static createConnectionFactory(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { retryAttempts, retryDelay } = options, cassandraOptions = __rest(options, ["retryAttempts", "retryDelay"]);
            const connection = new orm_1.Connection(cassandraOptions);
            return yield (0, rxjs_1.defer)(() => connection.initAsync())
                .pipe((0, cassandra_orm_utils_1.handleRetry)(retryAttempts, retryDelay), (0, operators_1.map)(() => connection))
                .toPromise();
        });
    }
};
ExpressCassandraCoreModule = ExpressCassandraCoreModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({}),
    __param(0, (0, common_1.Inject)(express_cassandra_constant_1.EXPRESS_CASSANDRA_MODULE_OPTIONS)),
    __metadata("design:paramtypes", [Object, core_1.ModuleRef])
], ExpressCassandraCoreModule);
exports.ExpressCassandraCoreModule = ExpressCassandraCoreModule;
//# sourceMappingURL=express-casandra-core.module.js.map