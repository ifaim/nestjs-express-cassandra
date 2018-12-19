import { Entity, Column } from '@iaminfinity/express-cassandra';

@Entity<DogEntity>({
  table_name: 'dog',
  key: ['id'],
})
export class DogEntity {
  @Column({
    type: 'uuid',
    default: { $db_function: 'uuid()' },
  })
  id: any;

  @Column({
    type: 'text',
  })
  name: string;
}
