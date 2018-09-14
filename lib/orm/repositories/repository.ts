export class Repository<T = any> {
  constructor(private readonly entity: any) {}

  findOne(query: any, options?: any): Promise<T>;

  findOne(query = {}, options): Promise<T> {
    return this.entity.findOneAsync(query, options);
  }

  find(query: any, options?: any): Promise<T[]>;

  find(query: any = {}, options?: any): Promise<T[]> {
    return this.entity.findAsync(query, options);
  }

  save(entity: T, options?: any): Promise<T>;

  async save(entity: T, options?: any): Promise<T> {
    const model = new this.entity(entity);
    await model.saveAsync(options);
    return model;
  }

  update(query: any, updateValue: any, options?: any): Promise<T>;

  update(query: any, updateValue: any, options?: any): Promise<T> {
    return this.entity.updateAsync(query, updateValue, options);
  }

  remove(query: any, options: any): Promise<boolean>;

  remove(query: any, options: any): Promise<boolean> {
    return this.entity.deleteAsync(query, options);
  }

  truncate(): Promise<any> {
    return this.entity.truncateAsync();
  }

  stream(
    query: any,
    options: any,
    reader: (reader: { readRow(): any }) => void,
    done: (err?: Error) => void,
  ): void;

  stream(
    query: any,
    options: any,
    reader: (reader) => void,
    done: (err: Error) => void,
  ): void {
    this.entity.stream(query, options, reader, done);
  }

  eachRow(
    query: any,
    options: any,
    onRow: (n, row) => void,
    done: (err: Error, result: any) => void,
  ): void;

  eachRow(
    query: any,
    options: any,
    onRow: (n, row) => void,
    done: (err: Error, result: any) => void,
  ): void {
    this.entity.eachRow(query, options, onRow, done);
  }
}
