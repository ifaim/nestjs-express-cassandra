import { DynamicModule, Module } from '@nestjs/common';
import { ExpressCassandraCoreModule } from './express-casandra-core.module';
import {
  ExpressCassandraModuleOptions,
  ExpressCassandraModuleAsyncOptions,
  ConnectionOptions,
} from './interfaces';
import { createExpressCassandraProviders } from './express-cassandra.providers';
import * as Connection from 'express-cassandra';

@Module({})
export class ExpressCassandraModule {
  static forRoot(options: ExpressCassandraModuleOptions): DynamicModule {
    return {
      module: ExpressCassandraModule,
      imports: [ExpressCassandraCoreModule.forRoot(options)],
    };
  }

  static forFeature(
    entities: Function[] = [],
    connection: Connection | ConnectionOptions | string = 'default',
  ): DynamicModule {
    const providers = createExpressCassandraProviders(entities, connection);
    return {
      module: ExpressCassandraModule,
      providers,
      exports: providers,
    };
  }

  static forRootAsync(
    options: ExpressCassandraModuleAsyncOptions,
  ): DynamicModule {
    return {
      module: ExpressCassandraModule,
      imports: [ExpressCassandraCoreModule.forRootAsync(options)],
    };
  }
}
