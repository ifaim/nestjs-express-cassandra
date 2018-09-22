import { Module } from '@nestjs/common';
import {
  ExpressCassandraModule,
  ExpressCassandraModuleOptions,
} from '@iaminfinity/express-cassandra';
import { CatsModule } from './cats';

const cassandraOptions: ExpressCassandraModuleOptions = {
  clientOptions: {
    contactPoints: ['localhost'],
    keyspace: 'test',
    protocolOptions: {
      port: 9042,
    },
    queryOptions: {
      consistency: 1,
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
  retryAttempts: 1,
  retryDelay: 1000,
};

@Module({
  imports: [ExpressCassandraModule.forRoot(cassandraOptions), CatsModule],
})
export class AppModule {}
