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
var CatEntity_1;
Object.defineProperty(exports, '__esModule', { value: true });
exports.CatEntity = void 0;
const express_cassandra_1 = require('@iaminfinity/express-cassandra');
const common_1 = require('@nestjs/common');
let CatEntity = (CatEntity_1 = class CatEntity {
  beforeSave(instance, options) {
    common_1.Logger.log('Before save called', CatEntity_1.name);
  }
  afterSave(instance, options) {
    common_1.Logger.log('After save called', CatEntity_1.name);
  }
});
__decorate(
  [
    (0, express_cassandra_1.GeneratedUUidColumn)(),
    __metadata('design:type', Object),
  ],
  CatEntity.prototype,
  'id',
  void 0,
);
__decorate(
  [
    (0, express_cassandra_1.GeneratedUUidColumn)('timeuuid'),
    __metadata('design:type', Object),
  ],
  CatEntity.prototype,
  'time_id',
  void 0,
);
__decorate(
  [
    (0, express_cassandra_1.Column)({
      type: 'text',
    }),
    __metadata('design:type', String),
  ],
  CatEntity.prototype,
  'name',
  void 0,
);
__decorate(
  [
    (0, express_cassandra_1.Column)({
      type: 'int',
    }),
    (0, express_cassandra_1.IndexColumn)(),
    __metadata('design:type', Number),
  ],
  CatEntity.prototype,
  'age',
  void 0,
);
__decorate(
  [
    (0, express_cassandra_1.Column)({
      type: 'text',
    }),
    __metadata('design:type', String),
  ],
  CatEntity.prototype,
  'breed',
  void 0,
);
__decorate(
  [
    (0, express_cassandra_1.CreateDateColumn)(),
    __metadata('design:type', Date),
  ],
  CatEntity.prototype,
  'created_at',
  void 0,
);
__decorate(
  [
    (0, express_cassandra_1.UpdateDateColumn)(),
    __metadata('design:type', Date),
  ],
  CatEntity.prototype,
  'updated_at',
  void 0,
);
__decorate(
  [(0, express_cassandra_1.VersionColumn)(), __metadata('design:type', Object)],
  CatEntity.prototype,
  '__v1',
  void 0,
);
__decorate(
  [
    (0, express_cassandra_1.BeforeSave)(),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Object, Object]),
    __metadata('design:returntype', void 0),
  ],
  CatEntity.prototype,
  'beforeSave',
  null,
);
__decorate(
  [
    (0, express_cassandra_1.AfterSave)(),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Object, Object]),
    __metadata('design:returntype', void 0),
  ],
  CatEntity.prototype,
  'afterSave',
  null,
);
CatEntity = CatEntity_1 = __decorate(
  [
    (0, express_cassandra_1.Entity)({
      table_name: 'cats',
      key: [['id'], 'time_id'],
    }),
  ],
  CatEntity,
);
exports.CatEntity = CatEntity;
//# sourceMappingURL=cat.entity.js.map
