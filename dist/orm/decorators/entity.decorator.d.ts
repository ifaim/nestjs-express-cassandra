import { EntityOptions } from '../interfaces';
export declare function Entity<T = any>(options?: EntityOptions<T>): ClassDecorator;
export declare function Entity<T = any>(name?: string, options?: EntityOptions<T>): ClassDecorator;
