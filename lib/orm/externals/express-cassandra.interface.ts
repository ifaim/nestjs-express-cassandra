export interface BaseModel<T = any> {
  new (value?: Partial<T>): BaseModelStatic<T> & T;

  findOneAsync(
    query: FindQuery<T>,
    options?: FindQueryOptionsStatic<T>,
  ): Promise<BaseModelStatic<T> & T>;

  findAsync(
    query: FindQuery<T>,
    options?: FindQueryOptionsStatic<T>,
  ): Promise<BaseModelStatic<T>[] & T[]>;

  updateAsync(
    query: FindQuery<T>,
    updateValue: Partial<T>,
    options?: UpdateOptionsStatic<T>,
  ): Promise<T | any>;

  deleteAsync(query: FindQuery<T>, options?): Promise<T | any>;

  truncateAsync(): Promise<any>;

  stream(
    query: FindQuery<T>,
    options: FindQueryOptionsStatic<T>,
    reader: (reader) => void,
    done: (err: Error) => void,
  ): void;

  eachRow(
    query: FindQuery<T>,
    options: FindQueryOptionsStatic<T>,
    onRow: (n, row) => void,
    done: (err: Error, result: any) => void,
  ): void;

  search(
    options: EsSearchOptionsStatic,
    callback?: (err: Error, response?: any) => void,
  ): void;

  get_es_client(): any;

  get_keyspace_name(): string;

  get_table_name(): string;

  createVertex<R>(
    entity: Partial<T | R>,
    callback?: (err: Error, response?: any) => void,
  ): void;

  getVertex(id: any, callback?: (err: Error, response?: any) => void): void;

  updateVertex<R>(
    id: any,
    updateEntity: Partial<T | R>,
    callback?: (err: Error, response?: any) => void,
  ): void;

  deleteVertex(id: any, callback?: (err: Error) => void): void;

  createEdge(
    relation: string,
    followerVertexId: any,
    followeeVertexId: any,
    callback?: (err: Error, response?: any) => void,
  ): void;

  createEdge(
    relation: string,
    followerVertexId: any,
    followeeVertexId: any,
    model: any,
    callback?: (err: Error, response?: any) => void,
  ): void;

  getEdge(id: any, callback?: (err: Error, response?: any) => void): void;

  updateEdge(
    id: any,
    updateModel: any,
    callback?: (err: Error, response?: any) => void,
  ): void;

  deleteEdge(id: any, callback?: (err: Error) => void): void;

  graphQuery<R>(
    query: string,
    entityQuery: Partial<T | R>,
    callback?: (err: Error, response?: any) => void,
  ): void;

  get_gremlin_client(): GremlinClientStatic<T>;

  [index: string]: any;
}

export interface BaseModelStatic<T> {
  saveAsync(options?: SaveOptionsStatic): Promise<T>;

  updateAsync(
    updateValue: Partial<T>,
    options?: UpdateOptionsStatic<T>,
  ): Promise<T>;

  deleteAsync(options?): Promise<T>;

  isModify(key?: keyof T): boolean;

  toJSON(): T;

  [index: string]: any;
}

export interface FindQueryOptionsStatic<T = any> {
  select?: Array<String | keyof T>;

  materialized_view?: string;

  allow_filtering?: boolean;

  distinct?: boolean;

  autoPage?: boolean;

  fetchSize?: number;

  pageState?: string;

  raw?: boolean;

  [index: string]: any;
}

export type FindQuery<T> = { [P in keyof T]?: T[P] | FindSubQueryStatic } &
  FindQueryStatic<T>;

interface FindQueryStatic<T> {
  $orderby?: {
    $asc?: keyof T | Array<keyof T>;
    $desc?: keyof T | Array<keyof T>;
  };

  $limit?: number;
}

interface FindSubQueryStatic {
  $token?: any;

  $in?: string[];

  $like?: string;

  $eq?: any;

  $ne?: any;

  $isnt?: any;

  $gt?: any;

  $lt?: any;

  $gte?: any;

  $lte?: any;

  $contains?: string;

  $contains_key?: string[];

  $solr_query?: string;
}

export interface SaveOptionsStatic {
  ttl?: number;

  if_not_exist?: boolean;
}

export interface UpdateOptionsStatic<T> {
  ttl?: number;

  if_exists?: boolean;

  conditions?: { [P in keyof T]?: T[P] };
}

export interface DeleteOptionsStatic {
  if_exists?: boolean;
}

export interface EsSearchOptionsStatic {
  q?: string;

  from?: number;

  size?: number;

  sort?: string[];

  body?: {
    query?: any;

    [index: string]: any;
  };

  [index: string]: any;
}

interface GremlinClientStatic<TEntity = any> {
  execute<T>(
    query: string,
    entityQuery: Partial<TEntity | T>,
    callback?: (err: Error, response?: any) => void,
  ): void;

  [index: string]: any;
}
