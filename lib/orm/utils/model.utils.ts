import { getAttributes, getOptions } from './decorator.utils';
import { Logger } from '@nestjs/common';

export function loadModel(connection: any, entity: any): Promise<any> {
  const schema = getSchema(entity);
  const modelName = entity.name || entity.table_name;
  const model = connection.loadSchema(modelName, schema);

  return new Promise(resolve => {
    model.syncDB(err => {
      if (err) {
        Logger.error(err.message, err.stack, 'ExpressCassandraModule');
        return resolve(model);
      }
      return resolve(model);
    });
  });
}

export function getSchema(entity: Function) {
  const attributes = getAttributes(entity.prototype);
  const { instanceMethods, classMethods, ...options } = getOptions(
    entity.prototype,
  );
  const model = { ...options };
  model.fields = { ...attributes };
  return model;
}
