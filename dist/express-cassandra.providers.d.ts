import { ConnectionOptions, Connection } from './orm';
import { Provider } from '@nestjs/common';
export declare function createExpressCassandraProviders(entities?: Function[], connection?: Connection | ConnectionOptions | string): Provider<any>[];
