import {
  getModelToken,
  getConnectionToken,
  handleRetry,
  getRepositoryToken,
} from './utils/cassandra-orm.utils';
import { EXPRESS_CASSANDRA_MODULE_OPTIONS } from './express-cassandra.constant';
import { defer } from 'rxjs';
import { loadModel, Repository } from './orm';
import { getEntity } from './orm/utils/decorator.utils';

export function createExpressCassandraProviders(
  entities?: Function[],
  connection?: string | any,
) {
  const providerModel = entity => ({
    provide: getModelToken(entity),
    useFactory: async (client: any, options) => {
      return await defer(() => loadModel(client, entity))
        .pipe(handleRetry(options.retryAttempts, options.retryDelay))
        .toPromise();
    },
    inject: [getConnectionToken(connection), EXPRESS_CASSANDRA_MODULE_OPTIONS],
  });

  const provideRepository = EntityRepository => {
    const entitySchema = getEntity(EntityRepository);
    return {
      provide: getRepositoryToken(EntityRepository),
      useFactory: async model => createRepository(EntityRepository, model),
      inject: [getModelToken(entitySchema)],
    };
  };

  const models = (entities || []).map(entity => {
    if (entity.prototype instanceof Repository) {
      return provideRepository(entity);
    }
    return providerModel(entity);
  });
  return [...models];
}

const createRepository = (EntityRepository, model: any): Repository => {
  return Object.assign(new EntityRepository(), { entity: model });
};
