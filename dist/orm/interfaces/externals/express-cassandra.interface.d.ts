declare type Callback = (error: Error, value?: any) => void;
export interface BaseModel<T = any> {
    new <R>(value?: Partial<T | R>): BaseModelStatic<T> & T;
    findOne(query: FindQuery<T>, options: {
        return_query: true;
    } & FindQueryOptionsStatic<T>): string;
    findOne(query: FindQuery<T>, callback: Callback): void;
    findOne(query: FindQuery<T>, options: FindQueryOptionsStatic<T>, callback: Callback): void;
    findOneAsync(query: FindQuery<T>, options: FindQueryOptionsStatic<T> & {
        raw: true;
    }): Promise<T>;
    findOneAsync(query: FindQuery<T>, options?: FindQueryOptionsStatic<T>): Promise<BaseModelStatic<T>>;
    find(query: FindQuery<T>, options?: {
        return_query: true;
    } & FindQueryOptionsStatic<T>): string;
    find(query: FindQuery<T>, callback: Callback): void;
    find(query: FindQuery<T>, options: FindQueryOptionsStatic<T>, callback: Callback): void;
    findAsync(query: FindQuery<T>, options: FindQueryOptionsStatic<T> & {
        raw: true;
    }): Promise<T[]>;
    findAsync(query: FindQuery<T>, options?: FindQueryOptionsStatic<T>): Promise<BaseModelStatic<T>[]>;
    update(query: FindQuery<T>, updateValue: Partial<T>, options: {
        return_query: true;
    } & UpdateOptionsStatic<T>): string;
    update(query: FindQuery<T>, updateValue: Partial<T>, callback?: Callback): void;
    update(query: FindQuery<T>, updateValue: Partial<T>, options: UpdateOptionsStatic<T>, callback?: Callback): void;
    updateAsync(query: FindQuery<T>, updateValue: Partial<T>, options?: UpdateOptionsStatic<T>): Promise<T | any>;
    delete(query: FindQuery<T>, options: {
        return_query: true;
    } & DeleteOptionsStatic): string;
    delete(query: FindQuery<T>, callback?: Callback): void;
    delete(query: FindQuery<T>, options?: DeleteOptionsStatic, callback?: Callback): void;
    deleteAsync(query: FindQuery<T>, options?: DeleteOptionsStatic): Promise<T | any>;
    truncateAsync(): Promise<any>;
    stream(query: FindQuery<T>, options: FindQueryOptionsStatic<T>, reader: (reader: any) => void, done: (err: Error) => void): void;
    eachRow(query: FindQuery<T>, options: FindQueryOptionsStatic<T>, onRow: (n: any, row: any) => void, done: (err: Error, result: any) => void): void;
    execute_query(query: string, params: any[], callback?: Callback): void;
    execute_batch(queries: {
        query: string;
        params: any[];
    }[], callback?: (err: Error) => void): void;
    close(callback?: (err: Error) => void): void;
    syncDB(callback?: (err: Error, result: boolean) => void): any;
    get_keyspace_name(): string;
    get_table_name(): string;
    get_cql_client(): any;
    search(options: EsSearchOptionsStatic, callback?: Callback): void;
    get_es_client(): any;
    createVertex<R>(entity: Partial<T | R>, callback?: Callback): void;
    getVertex(id: any, callback?: Callback): void;
    updateVertex<R>(id: any, updateEntity: Partial<T | R>, callback?: Callback): void;
    deleteVertex(id: any, callback?: (err: Error) => void): void;
    createEdge(relation: string, followerVertexId: any, followeeVertexId: any, callback?: Callback): void;
    createEdge(relation: string, followerVertexId: any, followeeVertexId: any, model: any, callback?: Callback): void;
    getEdge(id: any, callback?: Callback): void;
    updateEdge(id: any, updateModel: any, callback?: Callback): void;
    deleteEdge(id: any, callback?: (err: Error) => void): void;
    graphQuery<R>(query: string, entityQuery: Partial<T | R>, callback?: Callback): void;
    get_gremlin_client(): GremlinClientStatic<T>;
    [index: string]: any;
}
export interface BaseModelStatic<T> {
    save(options: {
        return_query: boolean;
    } & SaveOptionsStatic): string;
    save(callback?: Callback): void;
    save(options: SaveOptionsStatic, callback?: Callback): void;
    saveAsync(options?: SaveOptionsStatic): Promise<any>;
    delete(options: {
        return_query: boolean;
    } & DeleteOptionsStatic): string;
    delete(callback?: Callback): void;
    delete(options: DeleteOptionsStatic, callback?: Callback): void;
    deleteAsync(options?: DeleteOptionsStatic): Promise<any>;
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
    prepare?: boolean;
    [index: string]: any;
}
export declare type FindQuery<T> = {
    [P in keyof T]?: T[P] | FindSubQueryStatic;
} & FindQueryStatic<T>;
export interface FindQueryStatic<T> {
    $orderby?: {
        $asc?: keyof T | Array<keyof T>;
        $desc?: keyof T | Array<keyof T>;
    };
    $limit?: number;
}
export interface FindSubQueryStatic {
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
    conditions?: {
        [P in keyof T]?: T[P];
    };
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
    execute<T>(query: string, entityQuery: Partial<TEntity | T>, callback?: Callback): void;
    [index: string]: any;
}
export {};
