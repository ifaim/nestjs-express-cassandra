import { DynamicModule, Module, Global, Provider, OnModuleDestroy, Inject, Logger } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { CassandraModuleOptions, CassandraModuleAsyncOptions, ExpressCassandraOptionsFactory } from './interfaces';
import { CASSANDRA_MODULE_OPTIONS, CASSANDRA_MODULE_ID } from './express-cassandra.constant';
import { getConnectionToken, handleRetry, generateString } from './utils/cassandra-orm.utils';
import { defer } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConnectionOptions, Connection } from './orm';

@Global()
@Module({})
export class CassandraCoreModule implements OnModuleDestroy {
  constructor(
    @Inject(CASSANDRA_MODULE_OPTIONS)
    private readonly options: CassandraModuleOptions,
    private readonly moduleRef: ModuleRef
  ) {}

  static forRoot(options: CassandraModuleOptions = {}): DynamicModule {
    const moduleOptions = {
      provide: CASSANDRA_MODULE_OPTIONS,
      useValue: options,
    };
    const connectionProvider = {
      provide: getConnectionToken(options as ConnectionOptions),
      useFactory: async () => await this.createConnectionFactory(options),
    };
    return {
      module: CassandraCoreModule,
      providers: [moduleOptions, connectionProvider],
      exports: [connectionProvider],
    };
  }

  static forRootAsync(options: CassandraModuleAsyncOptions): DynamicModule {
    const connectionProvider = {
      provide: getConnectionToken(options as ConnectionOptions),
      useFactory: async (typeormOptions: CassandraModuleOptions) => {
        if (options.name) {
          return await this.createConnectionFactory({
            ...typeormOptions,
            name: options.name,
          });
        }
        return await this.createConnectionFactory(typeormOptions);
      },
      inject: [CASSANDRA_MODULE_OPTIONS],
    };

    const asyncProviders = this.createAsyncProviders(options);
    return {
      module: CassandraCoreModule,
      imports: options.imports,
      providers: [
        ...asyncProviders,
        connectionProvider,
        {
          provide: CASSANDRA_MODULE_ID,
          useValue: generateString(),
        },
      ],
      exports: [connectionProvider],
    };
  }

  async onModuleDestroy() {
    if (this.options.keepConnectionAlive) {
      return;
    }
    Logger.log('Closing connection', 'CassandraModule');
    const connection = this.moduleRef.get<Connection>(getConnectionToken(this.options as ConnectionOptions) as any);
    // tslint:disable-next-line:no-unused-expression
    connection && (await connection.closeAsync());
  }

  private static createAsyncProviders(options: CassandraModuleAsyncOptions): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(options: CassandraModuleAsyncOptions): Provider {
    if (options.useFactory) {
      return {
        provide: CASSANDRA_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    return {
      provide: CASSANDRA_MODULE_OPTIONS,
      useFactory: async (optionsFactory: ExpressCassandraOptionsFactory) => await optionsFactory.createExpressCassandraOptions(),
      inject: [options.useClass || options.useExisting],
    };
  }

  private static async createConnectionFactory(options: CassandraModuleOptions): Promise<Connection> {
    const { retryAttempts, retryDelay, ...cassandraOptions } = options;
    const connection = new Connection(cassandraOptions);

    return await defer(() => connection.initAsync())
      .pipe(
        handleRetry(retryAttempts, retryDelay),
        map(() => connection)
      )
      .toPromise();
  }
}

export {
  /**
   * @deprecated will be dropped in 7.x
   */
  CassandraCoreModule as ExpressCassandraCoreModule,
};
