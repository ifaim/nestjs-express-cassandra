import { Observable } from 'rxjs';
import { delay, retryWhen, scan } from 'rxjs/operators';
import { Logger } from '@nestjs/common';

export function handleRetry(
  retryAttempts: number = 6,
  retryDelay: number = 3000,
): <T>(source: Observable<T>) => Observable<T> {
  return <T>(source: Observable<T>) =>
    source.pipe(
      retryWhen(e =>
        e.pipe(
          scan((errorCount: number, error: Error) => {
            Logger.error(
              `Unable to connect to the database. Retrying (${errorCount +
                1})...`,
              error.stack,
              'ExpressCassandraModule',
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

/**
 * @export
 * @param {(any | string)} [connection='default']
 * @returns {string}
 */
export function getConnectionToken(
  connection: any | string = 'default',
): string {
  return 'string' === typeof connection
    ? `${connection}Connection`
    : connection.name
    ? `${connection.name}Connection`
    : 'defaultConnection';
}

/**
 * @deprecated since version 0.1.1
 * @export
 * @param {*} options
 * @returns
 * @todo remove
 */
export function getConnectionName(options: any) {
  Logger.warn('Calling deplecated function', getConnectionName.name, false);
  return options && options.name ? options.name : 'default';
}

export function getModelToken(entity: any): string {
  return `${entity.name}Model`;
}

export function getRepositoryToken(entity: any): string {
  return `${entity.name}`;
}
