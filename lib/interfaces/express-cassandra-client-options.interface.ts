import { ClientOptions } from 'cassandra-driver';

export interface ClientOptionsStatic {
  clientOptions: ClientOptions &
    Partial<ElasticSearchClientOptionsStatic> &
    Partial<GreminServerClientOptionsStatic>;
  ormOptions: {
    defaultReplicationStrategy?: {
      class?: 'SimpleStrategy' | 'NetworkTopologyStrategy';
      replication_factor?: number;
    };
    migration?: 'safe' | 'alter' | 'drop';
    createKeyspace?: boolean;
    disableTTYConfirmation?: boolean;
    manageESIndex?: boolean;
    manageGraphs?: boolean;
  };
}

export interface ElasticSearchClientOptionsStatic {
  elasticsearch: {
    host?: string;
    apiVersion?: string;
    sniffOnStart?: boolean;
  };
}

export interface GreminServerClientOptionsStatic {
  gremlin: {
    host?: string;
    port?: string | number;
    options?: {
      user: string;
      password: string;
    };
  };
}
