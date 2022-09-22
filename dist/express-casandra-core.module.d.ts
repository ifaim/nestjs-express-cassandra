import { DynamicModule, OnModuleDestroy } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { ExpressCassandraModuleOptions, ExpressCassandraModuleAsyncOptions } from './interfaces';
export declare class ExpressCassandraCoreModule implements OnModuleDestroy {
    private readonly options;
    private readonly moduleRef;
    constructor(options: ExpressCassandraModuleOptions, moduleRef: ModuleRef);
    static forRoot(options?: ExpressCassandraModuleOptions): DynamicModule;
    static forRootAsync(options: ExpressCassandraModuleAsyncOptions): DynamicModule;
    onModuleDestroy(): Promise<void>;
    private static createAsyncProviders;
    private static createAsyncOptionsProvider;
    private static createConnectionFactory;
}
