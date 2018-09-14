import { Inject } from '@nestjs/common';
import { getModelToken } from './cassandra-orm.utils';

export const InjectModel = (entity: Function) => Inject(getModelToken(entity));
