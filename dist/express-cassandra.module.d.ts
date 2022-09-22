import { DynamicModule } from '@nestjs/common';
import { ExpressCassandraModuleOptions, ExpressCassandraModuleAsyncOptions } from './interfaces';
import { ConnectionOptions, Connection } from './orm';
export declare class ExpressCassandraModule {
    static forRoot(options: ExpressCassandraModuleOptions): DynamicModule;
    static forFeature(entities?: Function[], connection?: Connection | ConnectionOptions | string): DynamicModule;
    static forRootAsync(options: ExpressCassandraModuleAsyncOptions): DynamicModule;
}
