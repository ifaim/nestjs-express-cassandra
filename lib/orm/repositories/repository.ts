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
 * @template Entity
 */
export class Repository<Entity = any> {
  readonly entity: BaseModel<Entity>;

  findOne<T extends Partial<Entity>>(
    query: FindQuery<Entity>,
    options?: FindQueryOptionsStatic<Entity>,
  ): Observable<T | undefined>;

  findOne(query = {}, options?) {
    return from(this.entity.findOneAsync(query, options));
  }

  find(
    query: FindQuery<Entity>,
    options?: FindQueryOptionsStatic<Entity>,
  ): Observable<Entity[]>;

  find(query: any = {}, options?: any) {
    return from(this.entity.findAsync(query, options));
  }

  save(
    entity: Partial<Entity>,
    options?: SaveOptionsStatic,
  ): Observable<Entity>;

  save(entity: Entity, options?) {
    const model = new this.entity(entity);
    return defer(() => model.saveAsync(options)).pipe(map(() => model));
  }

  update(
    query: FindQuery<Entity>,
    updateValue: Partial<Entity>,
    options?: UpdateOptionsStatic<Entity>,
  ): Observable<any>;

  update(query = {}, updateValue, options?: any) {
    return from(this.entity.updateAsync(query, updateValue, options));
  }

  delete(
    query: FindQuery<Entity>,
    options?: DeleteOptionsStatic,
  ): Observable<any>;

  delete(query = {}, options?) {
    return from(this.entity.deleteAsync(query, options));
  }

  truncate(): Observable<any> {
    return from(this.entity.truncateAsync());
  }

  stream(
    query: FindQuery<Entity>,
    options?: FindQueryOptionsStatic<Entity>,
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
    query: FindQuery<Entity>,
    options?: FindQueryOptionsStatic<Entity>,
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
