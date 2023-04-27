import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { types, uuid, isUuid } from '@iaminfinity/express-cassandra';

@Injectable()
export class ParseUuidPipe implements PipeTransform<any, types.Uuid> {
  transform(value: any, { metatype }: ArgumentMetadata): types.Uuid {
    if (isUuid(value)) {
      return value;
    }

    if (!(typeof value === 'string')) {
      return value;
    }

    try {
      value = uuid(value);
    } catch (error) {
      throw new BadRequestException(`${error.message}`);
    }
    return value;
  }
}
