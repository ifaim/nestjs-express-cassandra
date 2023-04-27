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
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var CatsController_1;
Object.defineProperty(exports, '__esModule', { value: true });
exports.CatsController = void 0;
const common_1 = require('@nestjs/common');
const cat_service_1 = require('./cat.service');
const parse_uuid_pipe_1 = require('./pipes/parse-uuid.pipe');
const express_cassandra_1 = require('@iaminfinity/express-cassandra');
const cat_repository_1 = require('./cat.repository');
let CatsController = (CatsController_1 = class CatsController {
  constructor(catsService, catRepository) {
    this.catsService = catsService;
    this.catRepository = catRepository;
  }
  async create(createCatDto) {
    if (Array.isArray(createCatDto)) {
      return this.catRepository.saveMultiple(createCatDto);
    }
    const cat = await this.catsService.create(createCatDto).toPromise();
    return cat;
  }
  async findAll() {
    return this.catsService.findAll();
  }
  findOne(id) {
    return this.catsService.findById(id);
  }
  update(id, updateBody) {
    common_1.Logger.log(
      `Is uuid: ${(0, express_cassandra_1.isUuid)(id)}`,
      CatsController_1.name,
    );
    if (typeof updateBody.time_id === 'string') {
      updateBody.time_id = (0, express_cassandra_1.timeuuid)(
        updateBody.time_id,
      );
    }
    const { time_id } = updateBody,
      restBody = __rest(updateBody, ['time_id']);
    return this.catRepository.update({ id, time_id }, restBody);
  }
  async doBatch() {
    await this.catsService.batch();
    return;
  }
  delete() {
    return this.catRepository.truncate();
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
  CatsController.prototype,
  'create',
  null,
);
__decorate(
  [
    (0, common_1.Get)(),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', []),
    __metadata('design:returntype', Promise),
  ],
  CatsController.prototype,
  'findAll',
  null,
);
__decorate(
  [
    (0, common_1.Get)(':id'),
    __param(
      0,
      (0, common_1.Param)('id', new parse_uuid_pipe_1.ParseUuidPipe()),
    ),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Object]),
    __metadata('design:returntype', void 0),
  ],
  CatsController.prototype,
  'findOne',
  null,
);
__decorate(
  [
    (0, common_1.Patch)(':id'),
    __param(
      0,
      (0, common_1.Param)('id', new parse_uuid_pipe_1.ParseUuidPipe()),
    ),
    __param(1, (0, common_1.Body)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Object, Object]),
    __metadata('design:returntype', void 0),
  ],
  CatsController.prototype,
  'update',
  null,
);
__decorate(
  [
    (0, common_1.Post)('batch'),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', []),
    __metadata('design:returntype', Promise),
  ],
  CatsController.prototype,
  'doBatch',
  null,
);
__decorate(
  [
    (0, common_1.Delete)(),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', []),
    __metadata('design:returntype', void 0),
  ],
  CatsController.prototype,
  'delete',
  null,
);
CatsController = CatsController_1 = __decorate(
  [
    (0, common_1.Controller)('cats'),
    __param(
      1,
      (0, express_cassandra_1.InjectRepository)(cat_repository_1.CatRepository),
    ),
    __metadata('design:paramtypes', [
      cat_service_1.CatsService,
      cat_repository_1.CatRepository,
    ]),
  ],
  CatsController,
);
exports.CatsController = CatsController;
//# sourceMappingURL=cat.controller.js.map
