import { ColumnOptions } from '../interfaces';
export declare function Column(options: ColumnOptions): PropertyDecorator;
export declare function GeneratedUUidColumn(type?: 'uuid' | 'timeuuid'): PropertyDecorator;
export declare function VersionColumn(): PropertyDecorator;
export declare function CreateDateColumn(): PropertyDecorator;
export declare function UpdateDateColumn(): PropertyDecorator;
export declare function IndexColumn(): PropertyDecorator;
