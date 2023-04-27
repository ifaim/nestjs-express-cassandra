import { Repository } from '@iaminfinity/express-cassandra';
import { CatEntity } from './entities/cat.entity';
export declare class CatRepository extends Repository<CatEntity> {
  saveMultiple(cats: any[]): import('rxjs').Observable<unknown[]>;
}
