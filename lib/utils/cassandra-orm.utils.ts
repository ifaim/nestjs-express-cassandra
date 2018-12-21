import { Observable } from 'rxjs';
import { delay, retryWhen, scan } from 'rxjs/operators';
import { Logger } from '@nestjs/common';
import * as Connection from 'express-cassandra';
import { ConnectionOptions } from '../interfaces';

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

export function getConnectionToken(
  connection: Connection | ConnectionOptions | string = 'default',
): string | Function {
  return 'default' === connection
    ? Connection
    : 'string' === typeof connection
    ? `${connection}Connection`
    : 'default' === connection.name || !connection.name
    ? Connection
    : `${connection.name}Connection`;
}

export function getModelToken(entity: Function) {
  return `${entity.name}Model`;
}

export function getRepositoryToken(entity: Function) {
  return `${entity.name}Repository`;
}

export function getConnectionName(options: ConnectionOptions) {
  return options && options.name ? options.name : 'default';
}

// tslint:disable-next-line:no-bitwise
export const generateString = () =>
  [...Array(10)].map(i => ((Math.random() * 36) | 0).toString(36)).join;
