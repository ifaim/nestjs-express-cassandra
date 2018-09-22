import {
  BaseModel,
  FindQuery,
  FindQueryOptionsStatic,
  SaveOptionsStatic,
  UpdateOptionsStatic,
  DeleteOptionsStatic,
} from '../externals/express-cassandra.interface';
import { Observable, from, defer, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { types } from 'cassandra-driver';

/**
 * Express cassandra repository.
 * @export
 * @class Repository
 * @template T
 */
export class Repository<T = any> {
  readonly entity: BaseModel<T>;

  findOne(
    query: FindQuery<T>,
    options?: FindQueryOptionsStatic<T>,
  ): Observable<T>;

  findOne(query = {}, options?) {
    return from(this.entity.findOneAsync(query, options));
  }

  find(
    query: FindQuery<T>,
    options?: FindQueryOptionsStatic<T>,
  ): Observable<T[]>;

  find(query: any = {}, options?: any) {
    return from(this.entity.findAsync(query, options));
  }

  save(entity: T, options?: SaveOptionsStatic): Observable<T>;

  save(entity: T, options?) {
    const model = new this.entity(entity);
    return defer(() => model.saveAsync(options)).pipe(map(() => model));
  }

  update(
    query: FindQuery<T>,
    updateValue: Partial<T>,
    options?: UpdateOptionsStatic<T>,
  ): Observable<any>;

  update(query = {}, updateValue, options?: any) {
    return from(this.entity.updateAsync(query, updateValue, options));
  }

  delete(query: FindQuery<T>, options?: DeleteOptionsStatic): Observable<any>;

  delete(query = {}, options?) {
    return from(this.entity.deleteAsync(query, options));
  }

  truncate(): Observable<any> {
    return from(this.entity.truncateAsync());
  }

  stream(
    query: FindQuery<T>,
    options?: FindQueryOptionsStatic<T>,
  ): Observable<types.ResultSet> {
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
    query: FindQuery<T>,
    options?: FindQueryOptionsStatic<T>,
  ): EachRowArgument {
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
