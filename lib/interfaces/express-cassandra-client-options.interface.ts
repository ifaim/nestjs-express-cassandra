import { ClientOptions, types } from 'cassandra-driver';

export interface ClientOptionsStatic {
  clientOptions: ClientOptions;
  ormOptions: {
    defaultReplicationStrategy: {
      class?: 'SimpleStrategy' | 'any';
      replication_factor?: number;
    };
    migration?: 'safe' | 'alter' | 'drop';
    createKeyspace?: boolean;
  };
}

const a: ClientOptionsStatic = {
  clientOptions: {
    keyspace: 'test',
    contactPoints: [''],
    protocolOptions: { port: 9042 },
    queryOptions: {
      consistency: types.consistencies.one,
    },
  },
  ormOptions: {
    createKeyspace: true,
    defaultReplicationStrategy: {
      class: 'SimpleStrategy',
      replication_factor: 1,
    },
    migration: 'alter',
  },
};
