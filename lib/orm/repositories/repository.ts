import {
  BaseModel,
  FindQuery,
  FindQueryOptionsStatic,
  SaveOptionsStatic,
  UpdateOptionsStatic,
  DeleteOptionsStatic,
} from '../externals/express-cassandra.interface';
import { Observable, defer, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { types } from 'cassandra-driver';
import { Type } from '@nestjs/common';
import { ReturnQueryBuilder } from './builder/return-query.builder';
import { transformEntity } from '../utils/transform-entity.utils';

const defaultOptions = {
  findOptions: { raw: true },
  updateOptions: { if_exists: true },
  deleteOptions: { if_exists: true },
};

export class Repository<Entity = any> {
  readonly model: BaseModel<Entity>;

  readonly target: Type<Entity>;

  readonly returnQueryBuilder: ReturnQueryBuilder<Entity>;

  create(entity?: Partial<Entity>): Entity;
  create(entityLikeArray: Partial<Entity>[]): Entity[];

  create(entityLike?: any): Entity | Entity[] {
    if (Array.isArray(entityLike)) {
      return entityLike.map(entity => transformEntity(this.target, entity));
    }
    return transformEntity(this.target, entityLike);
  }

  findOne(
    query: FindQuery<Entity>,
    options?: FindQueryOptionsStatic<Entity>,
  ): Observable<Entity>;

  findOne(query: any = {}, options: any = {}): Observable<Entity> {
    return defer(() =>
      this.model.findOneAsync(query, {
        ...options,
        ...defaultOptions.findOptions,
      }),
    ).pipe(map(x => transformEntity(this.target, x)));
  }

  find(
    query: FindQuery<Entity>,
    options?: FindQueryOptionsStatic<Entity>,
  ): Observable<Entity[]>;

  find(query: any = {}, options: any = {}) {
    return defer(() =>
      this.model.findAsync(query, {
        ...options,
        ...defaultOptions.findOptions,
      }),
    ).pipe(map(x => transformEntity(this.target, x)));
  }

  findAndCount(
    query: FindQuery<Entity>,
    options: FindQueryOptionsStatic<Entity> = {},
  ): Observable<[Entity[], number]> {
    return defer(() =>
      this.model.findAsync(query, {
        ...(options as any),
        ...defaultOptions.findOptions,
      }),
    ).pipe(
      map(x => transformEntity(this.target, x)),
      map(entities => [entities, entities.length] as [Entity[], number]),
    );
  }

  save<T extends Partial<Entity>>(
    entity: T,
    options?: SaveOptionsStatic,
  ): Observable<Entity>;

  save(entity: any, options = {}) {
    const model = new this.model(entity);
    return defer(() => model.saveAsync(options)).pipe(
      map(() => transformEntity(this.target, model.toJSON())),
    );
  }

  update(
    query: FindQuery<Entity>,
    updateValue: Partial<Entity>,
    options?: UpdateOptionsStatic<Entity>,
  ): Observable<any>;

  update(query = {}, updateValue, options = {}) {
    return defer(() =>
      this.model.updateAsync(query, updateValue, {
        ...defaultOptions.updateOptions,
        ...options,
      }),
    );
  }

  delete(
    query: FindQuery<Entity>,
    options?: DeleteOptionsStatic,
  ): Observable<any>;

  delete(query = {}, options = {}) {
    return defer(() => this.model.deleteAsync(query, options));
  }

  truncate(): Observable<any> {
    return defer(() => this.model.truncateAsync());
  }

  stream(
    query: FindQuery<Entity>,
    options: FindQueryOptionsStatic<Entity> = {},
  ): Observable<Entity> {
    const reader$ = new Subject<any>();

    const onRead = (reader): void => {
      while (true) {
        const row = reader.readRow();
        if (row === null) {
          break;
        }
        reader$.next(transformEntity(this.target, row));
      }
    };

    const onDone = (error): void => {
      if (error) {
        reader$.error(error);
      }
      reader$.complete();
      return;
    };

    this.model.stream(
      query,
      { ...options, ...defaultOptions.findOptions },
      onRead,
      onDone,
    );

    return reader$.asObservable();
  }

  eachRow(
    query: FindQuery<Entity>,
    options: FindQueryOptionsStatic<Entity> = {},
  ): EachRowArgument {
    const reader$ = new Subject<any>();
    const done$ = new Subject<any>();
    const getReader = () => reader$.asObservable();
    const getDone = () => done$.asObservable();

    const onRow = (n, row): void =>
      reader$.next(transformEntity(this.target, row));
    const onDone = (err: Error, result: any): void => {
      if (err) {
        reader$.error(err);
        done$.error(err);
      } else {
        done$.next(result);
      }
      reader$.complete();
      done$.complete();
    };

    this.model.eachRow(
      query,
      { ...options, ...defaultOptions.findOptions },
      onRow,
      onDone,
    );

    return { getReader, getDone };
  }

  get getModelRef(): BaseModel<Entity> {
    return this.model;
  }

  getReturnQueryBuilder(): ReturnQueryBuilder<Entity> {
    return this.returnQueryBuilder;
  }

  doBatch(queries): Promise<any> {
    return this.model.execute_batchAsync(queries);
  }
}

export interface EachRowArgument {
  getReader<T = any>(): Observable<T>;

  getDone(): Observable<types.ResultSet>;
}
