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
