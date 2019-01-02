import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
  BeforeSave,
  AfterSave,
  IndexColumn,
  GeneratedUUidColumn,
} from '@iaminfinity/express-cassandra';
import { Logger } from '@nestjs/common';

@Entity({
  table_name: 'cats',
  // partition key = ['id']
  // clustering key = ['time_id']
  key: [['id'], 'time_id'],
})
export class CatEntity {
  @GeneratedUUidColumn()
  id: any;

  @GeneratedUUidColumn('timeuuid')
  time_id: any;

  @Column({
    type: 'text',
  })
  name: string;

  @Column({
    type: 'int',
  })
  @IndexColumn()
  age: number;

  @Column({
    type: 'text',
  })
  breed: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @VersionColumn()
  __v1: any;

  @BeforeSave()
  beforeSave(instance: this, options: any) {
    Logger.log('Before save called', CatEntity.name);
  }

  @AfterSave()
  afterSave(instance: this, options: any) {
    Logger.log('After save called', CatEntity.name);
  }
}
