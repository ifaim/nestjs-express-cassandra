import {
  getModelToken,
  getConnectionToken,
  handleRetry,
} from './utils/cassandra-orm.utils';
import { EXPRESS_CASSANDRA_MODULE_OPTIONS } from './express-cassandra.constact';
import { defer } from 'rxjs';
import { loadModel } from './orm';

export function createExpressCassandraProviders(
  entities?: Function[],
  connection?: string | any,
) {
  const models = (entities || []).map(entity => ({
    provide: getModelToken(entity),
    useFactory: async (client: any, options) => {
      return await defer(() => loadModel(client, entity))
        .pipe(handleRetry(options.retryAttempts, options.retryDelay))
        .toPromise();
    },
    inject: [getConnectionToken(connection), EXPRESS_CASSANDRA_MODULE_OPTIONS],
  }));
  return [...models];
}
