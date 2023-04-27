import { Repository } from '@iaminfinity/express-cassandra';
import { DogEntity } from './entities/dog.entity';
export declare class DogController {
  private readonly dogRepository;
  private readonly logger;
  constructor(dogRepository: Repository<DogEntity>);
  create(body: any): Promise<any>;
  get(): any;
  delete(): Promise<void>;
}
