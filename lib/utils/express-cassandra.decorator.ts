import { Inject } from '@nestjs/common';
import { getModelToken, getRepositoryToken } from './cassandra-orm.utils';

export const InjectModel = (entity: Function) => Inject(getModelToken(entity));

export const InjectRepository = (entity: Function) =>
  Inject(getRepositoryToken(entity));
