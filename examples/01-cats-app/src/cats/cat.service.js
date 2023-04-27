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
var CatsService_1;
var _a;
Object.defineProperty(exports, '__esModule', { value: true });
exports.CatsService = void 0;
const common_1 = require('@nestjs/common');
const express_cassandra_1 = require('@iaminfinity/express-cassandra');
const cat_entity_1 = require('./entities/cat.entity');
const operators_1 = require('rxjs/operators');
const dog_entity_1 = require('./entities/dog.entity');
const cat_repository_1 = require('./cat.repository');
let CatsService = (CatsService_1 = class CatsService {
  constructor(catRepository, dogRepository) {
    this.catRepository = catRepository;
    this.dogRepository = dogRepository;
    this.logger = new common_1.Logger(CatsService_1.name);
  }
  create(createCatDto) {
    const cat = this.catRepository.create(Object.assign({}, createCatDto));
    cat.age = 12;
    cat.breed = 'some';
    return this.catRepository.save(cat).pipe(
      (0, operators_1.tap)((x) => {
        this.logger.log(x);
        this.logger.log(
          `Instance of ${cat_entity_1.CatEntity.name}: ${
            x instanceof cat_entity_1.CatEntity
          }`,
        );
      }),
    );
  }
  findAll() {
    return this.catRepository.findAndCount({});
  }
  findById(id) {
    if (typeof id === 'string') {
      id = (0, express_cassandra_1.uuid)(id);
    }
    return this.catRepository.findOne({ id }).pipe(
      (0, operators_1.tap)((x) => {
        this.logger.log(x);
        this.logger.log(
          `Instance of ${cat_entity_1.CatEntity.name}: ${
            x instanceof cat_entity_1.CatEntity
          }`,
        );
      }),
    );
  }
  async batch() {
    const queries = [];
    const catBuilder = this.catRepository.getReturnQueryBuilder();
    const dogBuilder = this.dogRepository.getReturnQueryBuilder();
    queries.push(catBuilder.save({ name: 'batch cat' }));
    queries.push(dogBuilder.save({ name: 'batch dog' }));
    await this.catRepository.doBatch(queries);
    this.logger.log(`Running batch`, CatsService_1.name);
    this.logger.log(
      `Batch queries ${JSON.stringify(queries)}`,
      CatsService_1.name,
    );
    return;
  }
});
CatsService = CatsService_1 = __decorate(
  [
    (0, common_1.Injectable)(),
    __param(
      0,
      (0, express_cassandra_1.InjectRepository)(cat_repository_1.CatRepository),
    ),
    __param(
      1,
      (0, express_cassandra_1.InjectRepository)(dog_entity_1.DogEntity),
    ),
    __metadata('design:paramtypes', [
      cat_repository_1.CatRepository,
      typeof (_a =
        typeof express_cassandra_1.Repository !== 'undefined' &&
        express_cassandra_1.Repository) === 'function'
        ? _a
        : Object,
    ]),
  ],
  CatsService,
);
exports.CatsService = CatsService;
//# sourceMappingURL=cat.service.js.map
