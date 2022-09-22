import { Type } from '@nestjs/common';
export declare function transformEntity<T>(target: Type<T>, entityLike: any[]): T[];
export declare function transformEntity<T>(target: Type<T>, entityLike: any): T;
