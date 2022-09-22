import { Repository } from './repository';
import { BaseModel } from '../interfaces/externals/express-cassandra.interface';
export declare class RepositoryFactory {
    static create<T>(entity: Function, model: BaseModel, EntityRepository?: typeof Repository): Repository<T>;
}
