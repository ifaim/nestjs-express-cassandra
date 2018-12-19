import { types } from 'cassandra-driver';
export * from 'cassandra-driver';
export * from './interfaces';
export * from './express-cassandra.module';
export * from './utils/express-cassandra.decorator';
export * from './orm';

export const uuid = (id?: any): types.Uuid => {
  if (!id) {
    return types.Uuid.random();
  }
  if (typeof id === 'string') {
    return types.Uuid.fromString(id);
  }
  return id;
};

export const isUuid = (id: any): boolean => id && id instanceof types.Uuid;

export const timeuuid = (idOrDate?: string | Date): types.TimeUuid => {
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
};

export const isTimeUuid = (id: any): boolean =>
  id && id instanceof types.TimeUuid;
