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
Object.defineProperty(exports, '__esModule', { value: true });
exports.CatsController = void 0;
const common_1 = require('@nestjs/common');
const cat_service_1 = require('./cat.service');
const create_cat_dto_1 = require('./dto/create-cat.dto');
const parse_uuid_pipe_1 = require('./pipes/parse-uuid.pipe');
let CatsController = class CatsController {
  constructor(catsService) {
    this.catsService = catsService;
  }
  async create(createCatDto) {
    this.catsService.create(createCatDto);
  }
  async findAll() {
    return this.catsService.findAll();
  }
  findOne(id) {
    return this.catsService.findById(id);
  }
};
__decorate(
  [
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [create_cat_dto_1.CreateCatDto]),
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
CatsController = __decorate(
  [
    (0, common_1.Controller)('cats'),
    __metadata('design:paramtypes', [cat_service_1.CatsService]),
  ],
  CatsController,
);
exports.CatsController = CatsController;
//# sourceMappingURL=cat.controller.js.map
