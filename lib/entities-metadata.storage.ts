import { ConnectionOptions, Connection } from './orm';
import { EntityClass } from './interfaces/entity-class.type';

type ConnectionToken = Connection | ConnectionOptions | string;

export class EntitiesMetadataStorage {
  private static readonly storage = new Map<string, EntityClass[]>();

  static addEntitiesByConnection(
    connection: ConnectionToken,
    entities: EntityClass[],
  ): void {
    const connectionToken =
      typeof connection === 'string' ? connection : connection.name;
    if (!connectionToken) {
      return;
    }

    let collection = this.storage.get(connectionToken);
    if (!collection) {
      collection = [];
      this.storage.set(connectionToken, collection);
    }
    entities.forEach(entity => {
      if (collection!.includes(entity)) {
        return;
      }
      collection!.push(entity);
    });
  }

  static getEntitiesByConnection(connection: ConnectionToken): EntityClass[] {
    const connectionToken =
      typeof connection === 'string' ? connection : connection.name;

    if (!connectionToken) {
      return [];
    }
    return this.storage.get(connectionToken) || [];
  }
}
