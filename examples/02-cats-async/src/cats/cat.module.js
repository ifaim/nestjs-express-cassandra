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
exports.CatsModule = void 0;
const common_1 = require('@nestjs/common');
const express_cassandra_1 = require('@iaminfinity/express-cassandra');
const cat_entity_1 = require('./entities/cat.entity');
const cat_service_1 = require('./cat.service');
const cat_controller_1 = require('./cat.controller');
let CatsModule = class CatsModule {};
CatsModule = __decorate(
  [
    (0, common_1.Module)({
      imports: [
        express_cassandra_1.ExpressCassandraModule.forFeature([
          cat_entity_1.CatEntity,
        ]),
      ],
      controllers: [cat_controller_1.CatsController],
      providers: [cat_service_1.CatsService],
    }),
  ],
  CatsModule,
);
exports.CatsModule = CatsModule;
//# sourceMappingURL=cat.module.js.map
