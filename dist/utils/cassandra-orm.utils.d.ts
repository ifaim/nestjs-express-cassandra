import { Observable } from 'rxjs';
import { Type } from '@nestjs/common';
import { ConnectionOptions, Connection } from '../orm';
export declare function handleRetry(retryAttempts?: number, retryDelay?: number): <T>(source: Observable<T>) => Observable<T>;
export declare function getConnectionToken(connection?: Connection | ConnectionOptions | string): string | Function | Type<Connection>;
export declare function getModelToken(entity: Function): string;
export declare function getRepositoryToken(entity: Function): string;
export declare function getConnectionName(options: ConnectionOptions): string;
export declare const generateString: () => (separator?: string) => string;
