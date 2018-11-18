import { types } from 'cassandra-driver';

export { doBatchAsync, doBatch } from 'express-cassandra';
export * from 'cassandra-driver';

export * from './interfaces';
export * from './express-cassandra.module';
export * from './utils/express-cassandra.decorator';
export * from './orm';

export function uuid(id?): types.Uuid {
  if (!id) {
    return types.Uuid.random();
  }
  if (typeof id === 'string') {
    return types.Uuid.fromString(id);
  }
  if (id instanceof types.Uuid) {
    return id;
  }
  return id;
}

export function isUuid(id): boolean {
  return id && id instanceof types.Uuid ? true : false;
}

export function timeuuid(idOrDate?: string | Date): types.TimeUuid {
  if (!idOrDate) {
    return new types.TimeUuid();
  }
  if (typeof idOrDate === 'string') {
    return types.TimeUuid.fromString(idOrDate);
  }
  if (idOrDate instanceof Date) {
    return types.TimeUuid.fromDate(idOrDate);
  }
  return idOrDate;
}

export function isTimeUuid(id): boolean {
  return id && id instanceof types.TimeUuid ? true : false;
}

export declare function doBatchAsync(queries: string[]): Promise<any>;

export declare function doBatch(
  queries: string[],
  callback: (err: Error) => void,
): void;
