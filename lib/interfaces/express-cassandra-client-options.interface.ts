import { ClientOptions } from 'cassandra-driver';

export interface ClientOptionsStatic {
  clientOptions: ClientOptions & Partial<ElasticSearchClientOptionsStatic>;
  ormOptions: {
    defaultReplicationStrategy?: {
      class?: 'SimpleStrategy' | 'NetworkTopologyStrategy';
      replication_factor?: number;
    };
    migration?: 'safe' | 'alter' | 'drop';
    createKeyspace?: boolean;
    disableTTYConfirmation?: boolean;
    manageESIndex?: boolean;
  };
}

export interface ElasticSearchClientOptionsStatic {
  elasticsearch: {
    host?: string;
    apiVersion?: string;
    sniffOnStart?: boolean;
  };
}
