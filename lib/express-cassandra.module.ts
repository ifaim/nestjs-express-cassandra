import { DynamicModule, Module } from '@nestjs/common';
import { ExpressCassandraCoreModule } from './express-casandra-core.module';
import { EntityClass } from './interfaces/entity-class.type';
import {
  ExpressCassandraModuleOptions,
  ExpressCassandraModuleAsyncOptions,
} from './interfaces/express-cassandra-module-options.interface';
import { createExpressCassandraProviders } from './express-cassandra.providers';
import { ConnectionOptions, Connection } from './orm';
import { DEFAULT_CONNECTION_NAME } from './express-cassandra.constant';
import { EntitiesMetadataStorage } from './entities-metadata.storage';
import { getCustomRepositoryEntity } from './helpers/get-custom-repository-entity';

@Module({})
export class ExpressCassandraModule {
  static forRoot(options: ExpressCassandraModuleOptions): DynamicModule {
    return {
      module: ExpressCassandraModule,
      imports: [ExpressCassandraCoreModule.forRoot(options)],
    };
  }

  static forFeature(
    entities: EntityClass[] = [],
    connection:
      | Connection
      | ConnectionOptions
      | string = DEFAULT_CONNECTION_NAME,
  ): DynamicModule {
    const providers = createExpressCassandraProviders(entities, connection);
    const customRepositoryEntities = getCustomRepositoryEntity(entities);
    EntitiesMetadataStorage.addEntitiesByConnection(connection, [
      ...entities,
      ...customRepositoryEntities,
    ]);
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
