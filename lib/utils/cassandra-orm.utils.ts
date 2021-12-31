import { Observable } from 'rxjs';
import { delay, retryWhen, scan } from 'rxjs/operators';
import { Logger, Type } from '@nestjs/common';
import { ConnectionOptions, Connection, Repository } from '../orm';
import { v4 as uuid } from 'uuid';
import { EntityClass } from '../interfaces/entity-class.type';
import { DEFAULT_CONNECTION_NAME } from '../express-cassandra.constant';
import { CircularDependencyException } from '../exceptions/circular-dependency.exception';

const logger = new Logger('ExpressCassandraModule');

/**
 * This function returns a Repository injection token for given entity.
 * @param {EntityClass} entity This options is either an Entity class or Repository.
 * @param {string} [connection='default'] Connection name
 * @returns {string} The Repository injection token.
 */
export function getRepositoryToken(
  entity: EntityClass,
  connection: Connection | ConnectionOptions | string = DEFAULT_CONNECTION_NAME,
): Function | string {
  if (entity === null || entity === undefined) {
    throw new CircularDependencyException('@InjectRepository()');
  }
  const connectionPrefix = getConnectionPrefix(connection);
  if (entity instanceof Function && entity.prototype instanceof Repository) {
    if (!connectionPrefix) {
      return entity;
    }
    return `${connectionPrefix}${getCustomRepositoryToken(entity)}`;
  }

  return `${connectionPrefix}${entity.name}Repository`;
}

/**
 * This function generates an injection token for an Entity or Repository
 * @param {Function} This parameter can either be an Entity or Repository
 * @returns {string} The Repository injection token
 */
export function getCustomRepositoryToken(repository: Function): string {
  if (repository === null || repository === undefined) {
    throw new CircularDependencyException('@InjectRepository()');
  }
  return repository.name;
}

/**
 * This function returns a Connection injection token for the given Connection, ConnectionOptions or connection name.
 * @param {Connection | ConnectionOptions | string} [connection='default'] This optional parameter is either
 * a Connection, or a ConnectionOptions or a string.
 * @returns {string | Function} The Connection injection token.
 */
export function getConnectionToken(
  connection: Connection | ConnectionOptions | string = DEFAULT_CONNECTION_NAME,
): string | Function | Type<Connection> {
  return DEFAULT_CONNECTION_NAME === connection
    ? Connection
    : 'string' === typeof connection
    ? `${connection}Connection`
    : DEFAULT_CONNECTION_NAME === connection.name || !connection.name
    ? Connection
    : `${connection.name}Connection`;
}

/**
 * This function returns a Connection prefix based on the connection name
 * @param {Connection | ConnectionOptions | string} [connection='default'] This optional parameter is either
 * a Connection, or a ConnectionOptions or a string.
 * @returns {string | Function} The Connection injection token.
 */
export function getConnectionPrefix(
  connection: Connection | ConnectionOptions | string = DEFAULT_CONNECTION_NAME,
): string {
  if (connection === DEFAULT_CONNECTION_NAME) {
    return '';
  }
  if (typeof connection === 'string') {
    return connection + '_';
  }
  if (connection.name === DEFAULT_CONNECTION_NAME || !connection.name) {
    return '';
  }
  return connection.name + '_';
}

/**
 * This function returns a Cassandra model token for given entity.
 * @param {EntityClass} entity This parameter is an Entity class.
 * @returns {string} The Cassandra model injection token.
 */
export function getModelToken(entity: EntityClass): string {
  return `${entity.name}Model`;
}

export function handleRetry(
  retryAttempts = 9,
  retryDelay = 3000,
  connectionName = DEFAULT_CONNECTION_NAME,
  verboseRetryLog = false,
  toRetry?: (err: any) => boolean,
): <T>(source: Observable<T>) => Observable<T> {
  return <T>(source: Observable<T>) =>
    source.pipe(
      retryWhen(e =>
        e.pipe(
          scan((errorCount, error: Error) => {
            if (toRetry && !toRetry(error)) {
              throw error;
            }
            const connectionInfo =
              connectionName === DEFAULT_CONNECTION_NAME
                ? ''
                : ` (${connectionName})`;
            const verboseMessage = verboseRetryLog
              ? ` Message: ${error.message}.`
              : '';

            logger.error(
              `Unable to connect to the database${connectionInfo}.${verboseMessage} Retrying (${errorCount +
                1})...`,
              error.stack,
            );
            if (errorCount + 1 >= retryAttempts) {
              throw error;
            }
            return errorCount + 1;
          }, 0),
          delay(retryDelay),
        ),
      ),
    );
}

export function getConnectionName(options: ConnectionOptions): string {
  return options && options.name ? options.name : DEFAULT_CONNECTION_NAME;
}

export const generateString = (): string => uuid();
