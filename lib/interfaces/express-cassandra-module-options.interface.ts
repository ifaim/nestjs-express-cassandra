import { Type } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import { ClientOptionsStatic } from './express-cassandra-client-options.interface';

export type ExpressCassandraModuleOptions = {
  retryAttempts?: number;
  retryDelay?: number;
} & Partial<ClientOptionsStatic>;

export interface ExpressCassandraOptionsFactory {
  createExpressCassandraOptions():
    | Promise<ExpressCassandraModuleOptions>
    | ExpressCassandraModuleOptions;
}

export interface ExpressCassandraModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<ExpressCassandraOptionsFactory>;
  useClass?: Type<ExpressCassandraOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<ExpressCassandraModuleOptions> | ExpressCassandraModuleOptions;
  inject?: any[];
}
