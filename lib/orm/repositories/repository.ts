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

/**
 * Express cassandra repository.
 * @export
 * @class Repository
 * @template Entity
 */
export class Repository<Entity = any> {
  private readonly repositoryOptions = { raw: true };

  readonly entity: BaseModel<Entity>;

  readonly target;

  create(): Entity;

  create(entityLike: Partial<Entity>): Entity;

  create(entityLike?): Entity {
    if (this.target instanceof Function) {
      return new this.target(entityLike) as Entity;
    }
    return entityLike as Entity;
  }

  findOne<T extends Partial<Entity>>(
    query: FindQuery<Entity>,
    options?: FindQueryOptionsStatic<Entity>,
  ): Observable<T | undefined>;

  findOne(query = {}, options = {}) {
    return defer(() =>
      this.entity.findOneAsync(query, {
        ...options,
        ...this.repositoryOptions,
      }),
    );
  }

  find(
    query: FindQuery<Entity>,
    options?: FindQueryOptionsStatic<Entity>,
  ): Observable<Entity[]>;

  find(query: any = {}, options = {}) {
    return defer(() =>
      this.entity.findAsync(query, { ...options, ...this.repositoryOptions }),
    );
  }

  save(entity: any, options?: SaveOptionsStatic): Observable<Entity>;

  save(entity: any, options?) {
    const model = new this.entity(entity);
    return defer(() => model.saveAsync(options)).pipe(
      map(() => model.toJSON()),
    );
  }

  update(
    query: FindQuery<Entity>,
    updateValue: Partial<Entity>,
    options?: UpdateOptionsStatic<Entity>,
  ): Observable<any>;

  update(query = {}, updateValue, options?: any) {
    return defer(() => this.entity.updateAsync(query, updateValue, options));
  }

  delete(
    query: FindQuery<Entity>,
    options?: DeleteOptionsStatic,
  ): Observable<any>;

  delete(query = {}, options?) {
    return defer(() => this.entity.deleteAsync(query, options));
  }

  truncate(): Observable<any> {
    return defer(() => this.entity.truncateAsync());
  }

  stream(
    query: FindQuery<Entity>,
    options: FindQueryOptionsStatic<Entity> = {},
  ): Observable<types.ResultSet> {
    options = { ...options, ...this.repositoryOptions };
    const reader$ = new Subject<any>();

    const onRead = (reader): void => {
      while (true) {
        const row = reader.readRow();
        if (row === null) {
          break;
        }
        reader$.next(row);
      }
    };

    const onDone = (error): void => {
      if (error) {
        reader$.error(error);
      }
      reader$.complete();
      return;
    };
    this.entity.stream(query, options, onRead, onDone);
    return reader$.asObservable();
  }

  eachRow(
    query: FindQuery<Entity>,
    options: FindQueryOptionsStatic<Entity> = {},
  ): EachRowArgument {
    options = { ...options, ...this.repositoryOptions };
    const reader$ = new Subject<any>();
    const done$ = new Subject<any>();
    const getReader = () => reader$.asObservable();
    const getDone = () => done$.asObservable();

    const onRow = (n, row): void => reader$.next(row);
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
    this.entity.eachRow(query, options, onRow, onDone);
    return { getReader, getDone };
  }
}

export interface EachRowArgument {
  getReader<T = any>(): Observable<T>;

  getDone<T = any>(): Observable<types.ResultSet>;
}
