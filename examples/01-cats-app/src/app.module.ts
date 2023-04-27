import { Module } from '@nestjs/common';
import {
  ExpressCassandraModule,
  ExpressCassandraModuleOptions,
  auth,
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
    authProvider: new auth.PlainTextAuthProvider('cassandra', 'cassandra'),
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

@Module({
  imports: [ExpressCassandraModule.forRoot(cassandraOptions), CatsModule],
})
export class AppModule {}
