import { DynamicModule, Module } from '@nestjs/common';
import { CassandraCoreModule } from './express-casandra-core.module';
import { CassandraModuleOptions, CassandraModuleAsyncOptions } from './interfaces';
import { createCassandraModuleProviders } from './express-cassandra.providers';
import { ConnectionOptions, Connection } from './orm';

@Module({})
export class CassandraModule {
  static forRoot(options: CassandraModuleOptions): DynamicModule {
    return {
      module: CassandraModule,
      imports: [CassandraCoreModule.forRoot(options)],
    };
  }

  static forFeature(
    entities: Function[] = [],
    connection: Connection | ConnectionOptions | string = 'default'
  ): DynamicModule {
    const providers = createCassandraModuleProviders(entities, connection);
    return {
      module: CassandraModule,
      providers,
      exports: providers,
    };
  }

  static forRootAsync(options: CassandraModuleAsyncOptions): DynamicModule {
    return {
      module: CassandraModule,
      imports: [CassandraCoreModule.forRootAsync(options)],
    };
  }
}

export {
  /**
   * @deprecated
   */
  CassandraModule as ExpressCassandraModule
};
