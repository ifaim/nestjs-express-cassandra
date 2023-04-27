export interface EntitySubscriber<Entity = any> {
  beforeSave?(instance: Entity, options: any): Promise<boolean> | boolean | void;

  afterSave?(instance: Entity, options: any): Promise<boolean> | boolean | void;

  beforeUpdate?(query: Partial<Entity>, updateValues: Partial<Entity>, options: any): Promise<boolean> | boolean | void;

  afterUpdate?(query: Partial<Entity>, updateValues: Partial<Entity>, options: any): Promise<boolean> | boolean | void;

  beforeDelete?(query: Partial<Entity>, options: any): Promise<boolean> | boolean | void;

  afterDelete?(query: Partial<Entity>, options: any): Promise<boolean> | boolean | void;
}
