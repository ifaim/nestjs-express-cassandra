export class EntityNotFoundError extends Error {
  name = 'apollo.model.find.entitynotfound';
  public readonly message: any;

  constructor(entityClass: Function | string, query: any) {
    super();
    Object.setPrototypeOf(this, EntityNotFoundError.prototype);
    let targetName: string;
    if (typeof entityClass === 'function') {
      targetName = entityClass.name;
    } else {
      targetName = entityClass;
    }
    const queryString = this.stringifyQuery(query);
    this.message = `Could not find any entity of type "${targetName}" matching: ${queryString}`;
  }

  private stringifyQuery(query: any): string {
    try {
      return JSON.stringify(query, null, 4);
      // tslint:disable-next-line:no-empty
    } catch (e) {}
    return '' + query;
  }
}
