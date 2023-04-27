import { Type } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import { ConnectionOptions } from '../orm';

export type CassandraModuleOptions = {
  retryAttempts?: number;

  retryDelay?: number;

  keepConnectionAlive?: boolean;
} & Partial<ConnectionOptions>;

/**
 * @deprecated subject to change in 7.x, has no replacement at the moment
 */
export interface ExpressCassandraOptionsFactory {
  createExpressCassandraOptions(): Promise<CassandraModuleOptions> | CassandraModuleOptions;
}

export interface CassandraModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  name?: string;

  useExisting?: Type<ExpressCassandraOptionsFactory>;

  useClass?: Type<ExpressCassandraOptionsFactory>;

  useFactory?: (...args: any[]) => Promise<CassandraModuleOptions> | CassandraModuleOptions;

  inject?: any[];
}

export {
  /**
   * @deprecated will be dropped in 7.x
   */
  CassandraModuleOptions as ExpressCassandraModuleOptions,
  /**
   * @deprecated will be dropped in 7.x
   */
  CassandraModuleAsyncOptions as ExpressCassandraModuleAsyncOptions,
};
