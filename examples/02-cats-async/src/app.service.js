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
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v);
  };
var __param =
  (this && this.__param) ||
  function (paramIndex, decorator) {
    return function (target, key) {
      decorator(target, key, paramIndex);
    };
  };
var _a;
Object.defineProperty(exports, '__esModule', { value: true });
exports.AppService = void 0;
const common_1 = require('@nestjs/common');
const express_cassandra_1 = require('@iaminfinity/express-cassandra');
const cat_entity_1 = require('./cats/entities/cat.entity');
let AppService = class AppService {
  constructor(connection, catModel) {
    this.connection = connection;
    this.catModel = catModel;
  }
  async create(createCatDto) {
    const cat = new this.catModel(createCatDto);
    return await cat.saveAsync();
  }
  async findById(id) {
    if (typeof id === 'string') {
      id = (0, express_cassandra_1.uuid)(id);
    }
    return await this.catModel.findOneAsync({ id }, { raw: true });
  }
};
AppService = __decorate(
  [
    (0, common_1.Injectable)(),
    __param(0, (0, express_cassandra_1.InjectConnection)('test2')),
    __param(1, (0, express_cassandra_1.InjectModel)(cat_entity_1.CatEntity)),
    __metadata('design:paramtypes', [
      Object,
      typeof (_a =
        typeof express_cassandra_1.BaseModel !== 'undefined' &&
        express_cassandra_1.BaseModel) === 'function'
        ? _a
        : Object,
    ]),
  ],
  AppService,
);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map
