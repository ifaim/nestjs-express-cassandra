export declare class EntityNotFoundError extends Error {
    name: string;
    readonly message: any;
    constructor(entityClass: Function | string, query: any);
    private stringifyQuery;
}
