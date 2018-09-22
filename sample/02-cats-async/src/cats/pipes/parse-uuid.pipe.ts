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
    if (!metatype || !this.toValidate(metatype) || isUuid(value)) {
      return value;
    }
    try {
      value = uuid(value);
    } catch (error) {
      throw new BadRequestException(`${error.message}`);
    }
    return value;
  }

  private toValidate(metatype): boolean {
    const typesList = [String, Boolean, Number, Array, Object];
    return !typesList.find(type => metatype === type);
  }
}
