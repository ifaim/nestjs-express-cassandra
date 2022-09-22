import { BaseModel, SaveOptionsStatic, FindQuery, DeleteOptionsStatic, UpdateOptionsStatic } from '../../interfaces/externals/express-cassandra.interface';
export declare class ReturnQueryBuilder<T = any> {
    private readonly model;
    constructor(model: BaseModel<T>);
    save(model: Partial<T>, options?: SaveOptionsStatic): string;
    update(query: FindQuery<T>, updateValue: Partial<T>, options?: UpdateOptionsStatic<T>): string;
    delete(query?: FindQuery<T>, options?: DeleteOptionsStatic): string;
}
