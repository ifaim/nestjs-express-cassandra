import { types } from 'cassandra-driver';
export declare const isUuid: (id: any) => boolean;
export declare const uuid: (id?: any) => types.Uuid;
export declare const isTimeUuid: (id: any) => boolean;
export declare const timeuuid: (idOrDate?: string | Date) => types.TimeUuid;
