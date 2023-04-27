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
exports.ParseUuidPipe = void 0;
const common_1 = require('@nestjs/common');
const express_cassandra_1 = require('@iaminfinity/express-cassandra');
let ParseUuidPipe = class ParseUuidPipe {
  transform(value, { metatype }) {
    if ((0, express_cassandra_1.isUuid)(value)) {
      return value;
    }
    if (!(typeof value === 'string')) {
      return value;
    }
    try {
      value = (0, express_cassandra_1.uuid)(value);
    } catch (error) {
      throw new common_1.BadRequestException(`${error.message}`);
    }
    return value;
  }
};
ParseUuidPipe = __decorate([(0, common_1.Injectable)()], ParseUuidPipe);
exports.ParseUuidPipe = ParseUuidPipe;
//# sourceMappingURL=parse-uuid.pipe.js.map
