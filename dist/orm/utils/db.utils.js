"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeuuid = exports.isTimeUuid = exports.uuid = exports.isUuid = void 0;
const cassandra_driver_1 = require("cassandra-driver");
const isUuid = (id) => id && id instanceof cassandra_driver_1.types.Uuid;
exports.isUuid = isUuid;
const uuid = (id) => {
    if (!id) {
        return cassandra_driver_1.types.Uuid.random();
    }
    if (typeof id === 'string') {
        return cassandra_driver_1.types.Uuid.fromString(id);
    }
    return id;
};
exports.uuid = uuid;
const isTimeUuid = (id) => id && id instanceof cassandra_driver_1.types.TimeUuid;
exports.isTimeUuid = isTimeUuid;
const timeuuid = (idOrDate) => {
    if (!idOrDate) {
        return new cassandra_driver_1.types.TimeUuid();
    }
    if (typeof idOrDate === 'string') {
        return cassandra_driver_1.types.TimeUuid.fromString(idOrDate);
    }
    if (idOrDate instanceof Date) {
        return cassandra_driver_1.types.TimeUuid.fromDate(idOrDate);
    }
    return idOrDate;
};
exports.timeuuid = timeuuid;
//# sourceMappingURL=db.utils.js.map