import { Inject } from '@nestjs/common';
import {
  getModelToken,
  getRepositoryToken,
  getConnectionToken,
} from './cassandra-orm.utils';
import * as Connection from 'express-cassandra';
import { ConnectionOptions } from '../interfaces';

export const InjectConnection: (
  connnection?: Connection | ConnectionOptions | string,
) => ParameterDecorator = (
  connnection?: Connection | ConnectionOptions | string,
) => Inject(getConnectionToken(connnection));

export const InjectModel = (entity: Function) => Inject(getModelToken(entity));

export const InjectRepository = (entity: Function) =>
  Inject(getRepositoryToken(entity));
