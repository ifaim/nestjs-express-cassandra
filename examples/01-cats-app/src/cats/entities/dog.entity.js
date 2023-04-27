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
Object.defineProperty(exports, '__esModule', { value: true });
exports.DogEntity = void 0;
const express_cassandra_1 = require('@iaminfinity/express-cassandra');
let DogEntity = class DogEntity {};
__decorate(
  [
    (0, express_cassandra_1.GeneratedUUidColumn)(),
    __metadata('design:type', Object),
  ],
  DogEntity.prototype,
  'id',
  void 0,
);
__decorate(
  [
    (0, express_cassandra_1.Column)({
      type: 'text',
    }),
    (0, express_cassandra_1.IndexColumn)(),
    __metadata('design:type', String),
  ],
  DogEntity.prototype,
  'name',
  void 0,
);
DogEntity = __decorate(
  [
    (0, express_cassandra_1.Entity)({
      table_name: 'dog',
      key: ['id'],
    }),
  ],
  DogEntity,
);
exports.DogEntity = DogEntity;
//# sourceMappingURL=dog.entity.js.map
