import { getAttributes, getOptions } from './decorator.utils';
import { Entity, Column } from '../decorators';

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

@Entity({
  table_name: 'test',
  key: ['id'],
})
export class Test {
  @Column({
    type: 'uuid',
    default: { $db_function: 'uuid()' },
  })
  id: any;

  @Column({
    type: 'text',
  })
  name: string;

  @Column({
    type: 'date',
    default: () => new Date(),
  })
  time: Date;
}
