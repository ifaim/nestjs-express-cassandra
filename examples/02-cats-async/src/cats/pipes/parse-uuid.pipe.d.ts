import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { types } from '@iaminfinity/express-cassandra';
export declare class ParseUuidPipe implements PipeTransform<any, types.Uuid> {
  transform(value: any, { metatype }: ArgumentMetadata): types.Uuid;
}
