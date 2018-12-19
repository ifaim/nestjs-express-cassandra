import { Entity, Column, uuid, timeuuid } from '@iaminfinity/express-cassandra';

@Entity({
  table_name: 'cats',
  // partition key = ['id']
  // clustering key = ['time_id']
  key: [['id'], 'time_id'],
  options: {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    versions: {
      key: '__v1',
    },
  },
  before_save: (instance: CatEntity, options) => {
    if (!instance.id) {
      instance.id = uuid();
    }
    if (!instance.time_id) {
      instance.id = timeuuid();
    }
  },
})
export class CatEntity {
  @Column({
    type: 'uuid',
    default: () => uuid(),
  })
  id: any;

  @Column({
    type: 'timeuuid',
    default: { $db_function: 'now()' },
  })
  time_id: any;

  @Column({
    type: 'text',
  })
  name: string;

  @Column({
    type: 'int',
  })
  age: number;

  @Column({
    type: 'text',
  })
  breed: string;
}
