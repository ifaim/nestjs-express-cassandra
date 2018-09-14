import { Observable } from 'rxjs';
import { delay, retryWhen, scan } from 'rxjs/operators';
import { Logger } from '@nestjs/common';

export function handleRetry(
  retryAttempts = 6,
  retryDelay = 3000,
): <T>(source: Observable<T>) => Observable<T> {
  return <T>(source: Observable<T>) =>
    source.pipe(
      retryWhen(e =>
        e.pipe(
          scan((errorCount: number, error: Error) => {
            Logger.error(
              `Unable to connect to the database. Retrying (${errorCount +
                1})...`,
              '',
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
  connection: any | string = 'default',
): string | Function {
  return 'default' === connection
    ? `${connection}Connection`
    : 'string' === typeof connection
      ? `${connection}Connection`
      : 'default' === connection.name || !connection.name
        ? connection
        : `${connection.name}Connection`;
}

export function getConnectionName(options: any) {
  return options && options.name ? options.name : 'default';
}

export function getModelToken(entity: any) {
  return `${entity.name}Model`;
}
