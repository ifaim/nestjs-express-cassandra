import { EntityClass } from '../interfaces/entity-class.type';
import { Repository } from '../orm';

export function getCustomRepositoryEntity(
  entities: EntityClass[],
): Array<EntityClass> {
  const customRepositoryEntities = new Array<EntityClass>();

  for (const entity of entities) {
    const isCustomRepository =
      entity instanceof Function && entity.prototype instanceof Repository;
    if (isCustomRepository) {
      const isEntityRegisteredAlready = entities.indexOf(entity) !== -1;
      if (!isEntityRegisteredAlready) {
        customRepositoryEntities.push(entity);
      }
    }
  }
  return customRepositoryEntities;
}
