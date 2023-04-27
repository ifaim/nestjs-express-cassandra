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
exports.CatRepository = void 0;
const express_cassandra_1 = require('@iaminfinity/express-cassandra');
const cat_entity_1 = require('./entities/cat.entity');
const rxjs_1 = require('rxjs');
const operators_1 = require('rxjs/operators');
let CatRepository = class CatRepository extends express_cassandra_1.Repository {
  saveMultiple(cats) {
    return (0, rxjs_1.from)(cats).pipe(
      (0, operators_1.mergeMap)((cat) => this.save(cat)),
      (0, operators_1.toArray)(),
    );
  }
};
CatRepository = __decorate(
  [(0, express_cassandra_1.EntityRepository)(cat_entity_1.CatEntity)],
  CatRepository,
);
exports.CatRepository = CatRepository;
//# sourceMappingURL=cat.repository.js.map
