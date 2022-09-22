"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateString = exports.getConnectionName = exports.getRepositoryToken = exports.getModelToken = exports.getConnectionToken = exports.handleRetry = void 0;
const operators_1 = require("rxjs/operators");
const common_1 = require("@nestjs/common");
const orm_1 = require("../orm");
function handleRetry(retryAttempts = 6, retryDelay = 3000) {
    return (source) => source.pipe((0, operators_1.retryWhen)(e => e.pipe((0, operators_1.scan)((errorCount, error) => {
        common_1.Logger.error(`Unable to connect to the database. Retrying (${errorCount +
            1})...`, error.stack, 'ExpressCassandraModule');
        if (errorCount + 1 >= retryAttempts) {
            throw error;
        }
        return errorCount + 1;
    }, 0), (0, operators_1.delay)(retryDelay))));
}
exports.handleRetry = handleRetry;
function getConnectionToken(connection = 'default') {
    return 'default' === connection
        ? orm_1.Connection
        : 'string' === typeof connection
            ? `${connection}Connection`
            : 'default' === connection.name || !connection.name
                ? orm_1.Connection
                : `${connection.name}Connection`;
}
exports.getConnectionToken = getConnectionToken;
function getModelToken(entity) {
    return `${entity.name}Model`;
}
exports.getModelToken = getModelToken;
function getRepositoryToken(entity) {
    if (entity.prototype instanceof orm_1.Repository) {
        return entity.name;
    }
    return `${entity.name}Repository`;
}
exports.getRepositoryToken = getRepositoryToken;
function getConnectionName(options) {
    return options && options.name ? options.name : 'default';
}
exports.getConnectionName = getConnectionName;
const generateString = () => [...Array(10)].map(i => ((Math.random() * 36) | 0).toString(36)).join;
exports.generateString = generateString;
//# sourceMappingURL=cassandra-orm.utils.js.map