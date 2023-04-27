import {
  ExpressCassandraOptionsFactory,
  ExpressCassandraModuleOptions,
} from '@iaminfinity/express-cassandra';
export declare class ConfigService implements ExpressCassandraOptionsFactory {
  createExpressCassandraOptions():
    | ExpressCassandraModuleOptions
    | Promise<ExpressCassandraModuleOptions>;
  getDbConfig1(): any;
  getDbConfig2(): any;
}
