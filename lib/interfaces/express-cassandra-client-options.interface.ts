import { ClientOptions } from 'cassandra-driver';

export interface ClientOptionsStatic {
  clientOptions: ClientOptions;
  ormOptions: {
    defaultReplicationStrategy?: {
      class?: 'SimpleStrategy' | 'NetworkTopologyStrategy';
      replication_factor?: number;
    };
    migration?: 'safe' | 'alter' | 'drop';
    createKeyspace?: boolean;
    disableTTYConfirmation?: boolean;
  };
}
