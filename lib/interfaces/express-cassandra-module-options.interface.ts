import { Type } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import { ClientOptionsStatic } from './express-cassandra-client-options.interface';

export type ExpressCassandraModuleOptions = {
  name?: string;
  retryAttempts?: number;
  retryDelay?: number;
  keepConnectionAlive?: boolean;
} & Partial<ClientOptionsStatic>;

export interface ExpressCassandraOptionsFactory {
  createExpressCassandraOptions():
    | Promise<ExpressCassandraModuleOptions>
    | ExpressCassandraModuleOptions;
}

export interface ExpressCassandraModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  name?: string;
  useExisting?: Type<ExpressCassandraOptionsFactory>;
  useClass?: Type<ExpressCassandraOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<ExpressCassandraModuleOptions> | ExpressCassandraModuleOptions;
  inject?: any[];
}
