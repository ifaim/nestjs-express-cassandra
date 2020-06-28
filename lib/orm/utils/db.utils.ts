import { types } from 'cassandra-driver';

export const isUuid = (id: any): boolean => id && id instanceof types.Uuid;

export const uuid = (id?: any): types.Uuid => {
  if (!id) {
    return types.Uuid.random();
  }
  if (typeof id === 'string') {
    return types.Uuid.fromString(id);
  }
  return id;
};

export const isTimeUuid = (id: any): boolean =>
  id && id instanceof types.TimeUuid;

export const timeuuid = (idOrDate?: string | Date): types.TimeUuid => {
  if (!idOrDate) {
    return types.TimeUuid.now();
  }
  if (typeof idOrDate === 'string') {
    return types.TimeUuid.fromString(idOrDate);
  }
  if (idOrDate instanceof Date) {
    return types.TimeUuid.fromDate(idOrDate);
  }
  return idOrDate;
};
