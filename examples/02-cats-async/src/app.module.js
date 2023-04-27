'use strict';
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AppModule = void 0;
const common_1 = require('@nestjs/common');
const express_cassandra_1 = require('@iaminfinity/express-cassandra');
const cats_1 = require('./cats');
const config_service_1 = require('./config/config.service');
const config_module_1 = require('./config/config.module');
const cat_entity_1 = require('./cats/entities/cat.entity');
const app_service_1 = require('./app.service');
let AppModule = class AppModule {};
AppModule = __decorate(
  [
    (0, common_1.Module)({
      imports: [
        express_cassandra_1.ExpressCassandraModule.forRootAsync({
          useClass: config_service_1.ConfigService,
        }),
        express_cassandra_1.ExpressCassandraModule.forRootAsync({
          name: 'test2',
          imports: [config_module_1.ConfigModule],
          useFactory: (config) => config.getDbConfig2(),
          inject: [config_service_1.ConfigService],
        }),
        express_cassandra_1.ExpressCassandraModule.forFeature(
          [cat_entity_1.CatEntity],
          'test2',
        ),
        cats_1.CatsModule,
      ],
      providers: [app_service_1.AppService],
    }),
  ],
  AppModule,
);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
