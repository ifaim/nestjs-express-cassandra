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
var DogController_1;
var _a;
Object.defineProperty(exports, '__esModule', { value: true });
exports.DogController = void 0;
const common_1 = require('@nestjs/common');
const express_cassandra_1 = require('@iaminfinity/express-cassandra');
const dog_entity_1 = require('./entities/dog.entity');
let DogController = (DogController_1 = class DogController {
  constructor(dogRepository) {
    this.dogRepository = dogRepository;
    this.logger = new common_1.Logger(DogController_1.name);
  }
  async create(body) {
    const dog = await this.dogRepository
      .save(Object.assign({}, body))
      .toPromise();
    this.logger.log(
      `Dog id ${dog.id.toString()}. Dog has id because ${
        dog_entity_1.DogEntity.name
      } use @PrimaryGeneratedColumn decorator.`,
    );
    return dog;
  }
  get() {
    return this.dogRepository.find({});
  }
  async delete() {
    await this.dogRepository.truncate().toPromise();
    return;
  }
});
__decorate(
  [
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Object]),
    __metadata('design:returntype', Promise),
  ],
  DogController.prototype,
  'create',
  null,
);
__decorate(
  [
    (0, common_1.Get)(),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', []),
    __metadata('design:returntype', void 0),
  ],
  DogController.prototype,
  'get',
  null,
);
__decorate(
  [
    (0, common_1.Delete)(),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', []),
    __metadata('design:returntype', Promise),
  ],
  DogController.prototype,
  'delete',
  null,
);
DogController = DogController_1 = __decorate(
  [
    (0, common_1.Controller)('dogs'),
    __param(
      0,
      (0, express_cassandra_1.InjectRepository)(dog_entity_1.DogEntity),
    ),
    __metadata('design:paramtypes', [
      typeof (_a =
        typeof express_cassandra_1.Repository !== 'undefined' &&
        express_cassandra_1.Repository) === 'function'
        ? _a
        : Object,
    ]),
  ],
  DogController,
);
exports.DogController = DogController;
//# sourceMappingURL=dog.controller.js.map
