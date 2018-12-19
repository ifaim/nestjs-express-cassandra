import {
  DynamicModule,
  Module,
  Global,
  Provider,
  OnModuleDestroy,
  Inject,
  Logger,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import {
  ExpressCassandraModuleOptions,
  ExpressCassandraModuleAsyncOptions,
  ExpressCassandraOptionsFactory,
} from './interfaces';
import { EXPRESS_CASSANDRA_MODULE_OPTIONS } from './express-cassandra.constant';
import { getConnectionToken, handleRetry } from './utils/cassandra-orm.utils';
import { createClient } from 'express-cassandra';
import { defer } from 'rxjs';
import { map } from 'rxjs/operators';

@Global()
@Module({})
export class ExpressCassandraCoreModule implements OnModuleDestroy {
  constructor(
    @Inject(EXPRESS_CASSANDRA_MODULE_OPTIONS)
    private readonly options: ExpressCassandraModuleOptions,
    private readonly moduleRef: ModuleRef,
  ) {}

  static forRoot(options: ExpressCassandraModuleOptions = {}): DynamicModule {
    const expressModuleOptions = {
      provide: EXPRESS_CASSANDRA_MODULE_OPTIONS,
      useValue: options,
    };
    const connectionProvider = {
      provide: getConnectionToken(options),
      useFactory: async () => this.createConnectionFactory(options),
    };
    return {
      module: ExpressCassandraCoreModule,
      providers: [expressModuleOptions, connectionProvider],
      exports: [connectionProvider, expressModuleOptions],
    };
  }

  static forRootAsync(
    options: ExpressCassandraModuleAsyncOptions,
  ): DynamicModule {
    const connectionProvider = {
      provide: getConnectionToken(options),
      useFactory: async (ormOptions: ExpressCassandraModuleOptions) =>
        this.createConnectionFactory(ormOptions),
      inject: [EXPRESS_CASSANDRA_MODULE_OPTIONS],
    };
    const asyncProviders = this.createAsyncProviders(options);
    return {
      module: ExpressCassandraCoreModule,
      imports: options.imports,
      providers: [...asyncProviders, connectionProvider],
      exports: [connectionProvider, ...asyncProviders],
    };
  }

  async onModuleDestroy() {
    if (this.options.keepConnectionAlive) {
      return;
    }
    Logger.log('Closing connection', 'ExpressCassandraModule');
    const connection = this.moduleRef.get(getConnectionToken(this.options));
    // tslint:disable-next-line:no-unused-expression
    connection && (await connection.closeAsync());
  }

  private static createAsyncProviders(
    options: ExpressCassandraModuleAsyncOptions,
  ): Provider[] {
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

  private static createAsyncOptionsProvider(
    options: ExpressCassandraModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: EXPRESS_CASSANDRA_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    return {
      provide: EXPRESS_CASSANDRA_MODULE_OPTIONS,
      useFactory: async (optionsFactory: ExpressCassandraOptionsFactory) =>
        await optionsFactory.createExpressCassandraOptions(),
      inject: [options.useClass || options.useExisting],
    };
  }

  private static async createConnectionFactory(
    options: ExpressCassandraModuleOptions,
  ): Promise<any> {
    const { retryAttempts, retryDelay, ...cassandraOptions } = options;
    const client = await createClient(cassandraOptions);
    return await defer(() => client.initAsync())
      .pipe(
        handleRetry(retryAttempts, retryDelay),
        map(() => client),
      )
      .toPromise();
  }
}
