import { getModelToken, getConnectionToken, getRepositoryToken } from './utils/cassandra-orm.utils';
import { defer } from 'rxjs';
import { loadModel, Repository, ConnectionOptions, Connection } from './orm';
import { getEntity } from './orm/utils/decorator.utils';
import { Provider } from '@nestjs/common';
import { RepositoryFactory } from './orm/repositories/repository.factory';

export function createCassandraModuleProviders(
  entities?: Function[],
  connection?: Connection | ConnectionOptions | string
) {
  const providerModel = entity => ({
    provide: getModelToken(entity),
    useFactory: async (connectionLike: Connection) => {
      return await defer(() => loadModel(connectionLike, entity)).toPromise();
    },
    inject: [getConnectionToken(connection)],
  });

  const provideRepository = entity => ({
    provide: getRepositoryToken(entity),
    useFactory: async model => RepositoryFactory.create(entity, model),
    inject: [getModelToken(entity)],
  });

  const provideCustomRepository = EntityRepository => {
    const entity = getEntity(EntityRepository);
    return {
      provide: getRepositoryToken(EntityRepository),
      useFactory: async model => RepositoryFactory.create(entity, model, EntityRepository),
      inject: [getModelToken(entity)],
    };
  };

  const providers: Provider[] = [];
  (entities || []).forEach(entity => {
    if (entity.prototype instanceof Repository) {
      return providers.push(provideCustomRepository(entity));
    }
    return providers.push(providerModel(entity), provideRepository(entity));
  });

  return [...providers];
}

export {
  /**
   * @deprecated will be dropped in 7.x
   */
  createCassandraModuleProviders as createExpressCassandraProviders,
};
