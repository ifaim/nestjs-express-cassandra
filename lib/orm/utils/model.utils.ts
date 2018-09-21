import { getAttributes, getOptions } from './decorator.utils';

export function loadModel(client, entity): Promise<any> {
  const schema = getSchema(entity);
  const modelName = entity.name || entity.table_name;
  const model = client.loadSchema(modelName, schema);
  return new Promise((resolve, reject) => {
    model.syncDB(err => {
      if (err) {
        return reject(err);
      }
      return resolve(model);
    });
  });
}

export function getSchema(entity) {
  const attributes = getAttributes(entity.prototype);
  const { instanceMethods, classMethods, ...options } = getOptions(
    entity.prototype,
  );
  const model = { ...options };
  model.fields = { ...attributes };
  return model;
}
