import { Inject } from '@nestjs/common';
import { getModelToken } from './cassandra-orm.utils';

export const InjectRepository = (entity: Function) =>
  Inject(getModelToken(entity));
