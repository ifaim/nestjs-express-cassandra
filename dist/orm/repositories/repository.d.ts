import { BaseModel, FindQuery, FindQueryOptionsStatic, SaveOptionsStatic, UpdateOptionsStatic, DeleteOptionsStatic } from '../interfaces/externals/express-cassandra.interface';
import { Observable } from 'rxjs';
import { types } from 'cassandra-driver';
import { Type } from '@nestjs/common';
import { ReturnQueryBuilder } from './builder/return-query.builder';
export declare class Repository<Entity = any> {
    readonly model: BaseModel<Entity>;
    readonly target: Type<Entity>;
    readonly returnQueryBuilder: ReturnQueryBuilder<Entity>;
    create(entity?: Partial<Entity>): Entity;
    create(entityLikeArray: Partial<Entity>[]): Entity[];
    findOne(query: FindQuery<Entity>, options?: FindQueryOptionsStatic<Entity>): Observable<Entity>;
    findOneOrFail(query: FindQuery<Entity>, options?: FindQueryOptionsStatic<Entity>): Observable<Entity>;
    find(query: FindQuery<Entity>, options?: FindQueryOptionsStatic<Entity>): Observable<Entity[]>;
    findAndCount(query: FindQuery<Entity>, options?: FindQueryOptionsStatic<Entity>): Observable<[Entity[], number]>;
    save(entity: Partial<Entity>, options?: SaveOptionsStatic): Observable<Entity>;
    save(entities: Partial<Entity>[], options?: SaveOptionsStatic): Observable<Entity[]>;
    update(query: FindQuery<Entity>, updateValue: Partial<Entity>, options?: UpdateOptionsStatic<Entity>): Observable<any>;
    remove(entity: Entity, options?: DeleteOptionsStatic): Observable<Entity>;
    remove(entity: Entity[], options?: DeleteOptionsStatic): Observable<Entity[]>;
    delete(query: FindQuery<Entity>, options?: DeleteOptionsStatic): Observable<any>;
    truncate(): Observable<any>;
    stream(query: FindQuery<Entity>, options?: FindQueryOptionsStatic<Entity>): Observable<Entity>;
    eachRow(query: FindQuery<Entity>, options?: FindQueryOptionsStatic<Entity>): EachRowArgument;
    get getModelRef(): BaseModel<Entity>;
    getReturnQueryBuilder(): ReturnQueryBuilder<Entity>;
    doBatch(queries: any): Promise<any>;
}
export interface EachRowArgument {
    getReader<T = any>(): Observable<T>;
    getDone(): Observable<types.ResultSet>;
}
