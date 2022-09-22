"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectRepository = exports.InjectModel = exports.InjectConnection = void 0;
const common_1 = require("@nestjs/common");
const cassandra_orm_utils_1 = require("./cassandra-orm.utils");
const InjectConnection = (connnection) => (0, common_1.Inject)((0, cassandra_orm_utils_1.getConnectionToken)(connnection));
exports.InjectConnection = InjectConnection;
const InjectModel = (entity) => (0, common_1.Inject)((0, cassandra_orm_utils_1.getModelToken)(entity));
exports.InjectModel = InjectModel;
const InjectRepository = (entity) => (0, common_1.Inject)((0, cassandra_orm_utils_1.getRepositoryToken)(entity));
exports.InjectRepository = InjectRepository;
//# sourceMappingURL=express-cassandra.decorator.js.map