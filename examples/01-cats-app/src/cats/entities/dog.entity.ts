import {
  Entity,
  Column,
  IndexColumn,
  GeneratedUUidColumn,
} from '@iaminfinity/express-cassandra';

@Entity<DogEntity>({
  table_name: 'dog',
  key: ['id'],
})
export class DogEntity {
  @GeneratedUUidColumn()
  id: any;

  @Column({
    type: 'text',
  })
  @IndexColumn()
  name: string;
}
