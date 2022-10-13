import { Entities, Entity, EntityId } from '../entities';
import { Empire } from '../entities/empire';
import { Land } from '../entities/land';
import { Region } from '../entities/region';

export class EntityManager {
  // TODO: check data structure, map?, dictionary?
  private _regions: Map<EntityId, Region> = new Map();
  private _lands: Map<EntityId, Land> = new Map();
  private _empires: Map<EntityId, Empire> = new Map();

  add<T extends Entities>(entity: T) {
    switch (entity.type) {
      case 'LAND':
        this._lands.set(entity.id, entity);
        break;
      case 'REGION':
        this._regions.set(entity.id, entity);
        break;
      case 'EMPIRE':
        this._empires.set(entity.id, entity);
        break;
      default:
    }
  }

  get<T extends Entities>(entityType: T['type'], entityId: EntityId): T {
    switch (entityType) {
      case 'LAND':
        return this._lands.get(entityId) as T;
      case 'REGION':
        return this._regions.get(entityId) as T;
      case 'EMPIRE':
        return this._empires.get(entityId) as T;
      default:
        throw Error('Entity not found');
    }
  }

  // TODO: fix this hack

  getAll<T extends Entities>(entityType: T['type']): T[] {
    switch (entityType) {
      case 'LAND':
        return Array.from(this._lands.values()) as T[];
      case 'REGION':
        return Array.from(this._regions.values()) as T[];
      case 'EMPIRE':
        return Array.from(this._empires.values()) as T[];
      default:
        return [];
    }
  }
}
