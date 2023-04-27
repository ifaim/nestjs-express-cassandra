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
const cassandraOptions = {
  clientOptions: {
    contactPoints: ['localhost'],
    keyspace: 'test',
    protocolOptions: {
      port: 9042,
    },
    queryOptions: {
      consistency: 1,
    },
    authProvider: new express_cassandra_1.auth.PlainTextAuthProvider(
      'cassandra',
      'cassandra',
    ),
  },
  ormOptions: {
    createKeyspace: true,
    defaultReplicationStrategy: {
      class: 'SimpleStrategy',
      replication_factor: 1,
    },
    migration: 'alter',
  },
};
let AppModule = class AppModule {};
AppModule = __decorate(
  [
    (0, common_1.Module)({
      imports: [
        express_cassandra_1.ExpressCassandraModule.forRoot(cassandraOptions),
        cats_1.CatsModule,
      ],
    }),
  ],
  AppModule,
);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
