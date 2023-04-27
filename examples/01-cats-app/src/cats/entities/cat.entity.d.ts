export declare class CatEntity {
  id: any;
  time_id: any;
  name: string;
  age: number;
  breed: string;
  created_at: Date;
  updated_at: Date;
  __v1: any;
  beforeSave(instance: this, options: any): void;
  afterSave(instance: this, options: any): void;
}
