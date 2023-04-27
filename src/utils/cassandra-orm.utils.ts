import { Observable } from 'rxjs';
import { delay, retryWhen, scan } from 'rxjs/operators';
import { Logger, Type } from '@nestjs/common';
import { ConnectionOptions, Connection, Repository } from '../orm';

export function handleRetry(
  retryAttempts: number = 6,
  retryDelay: number = 3000
): <T>(source: Observable<T>) => Observable<T> {
  return <T>(source: Observable<T>) =>
    source.pipe(
      retryWhen(e =>
        e.pipe(
          scan((errorCount: number, error: Error) => {
            Logger.error(
              `Unable to connect to the database. Retrying (${errorCount + 1})...`,
              error.stack,
              'CassandraModule'
            );
            if (errorCount + 1 >= retryAttempts) {
              throw error;
            }
            return errorCount + 1;
          }, 0),
          delay(retryDelay)
        )
      )
    );
}

/**
 * This function returns a Connection injection token for given Connection, ConnectionOptions or connection name.
 * @param {(Connection | ConnectionOptions | string)} [connection='default'] This optional parameter is either
 * a Connection or a ConnectionOptions or a string.
 * @returns {(string | Function | Type<Connection>)} The Connection injection token.
 */
export function getConnectionToken(
  connection: Connection | ConnectionOptions | string = 'default'
): string | Function | Type<Connection> {
  return 'default' === connection
    ? Connection
    : 'string' === typeof connection
    ? `${connection}Connection`
    : 'default' === connection.name || !connection.name
    ? Connection
    : `${connection.name}Connection`;
}

/**
 * This function returns a Cassandra model token for given entity.
 * @param {Function} entity This parameter is an Entity class.
 * @returns {string} The Cassandra model injection token.
 */
export function getModelToken(entity: Function): string {
  return `${entity.name}Model`;
}

/**
 * This function returns a Repository injection token for given entity.
 * @param {Function} entity This options is either an Entity class or Repository.
 * @returns {string} The Repository injection token.
 */
export function getRepositoryToken(entity: Function): string {
  if (entity.prototype instanceof Repository) {
    return entity.name;
  }
  return `${entity.name}Repository`;
}

export function getConnectionName(options: ConnectionOptions) {
  return options && options.name ? options.name : 'default';
}

export const generateString = () =>
  // tslint:disable-next-line:no-bitwise
  [...Array(10)].map(i => ((Math.random() * 36) | 0).toString(36)).join;
