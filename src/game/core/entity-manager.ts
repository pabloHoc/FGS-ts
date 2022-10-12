import { Entities, Entity } from '../entities';
import { Empire } from '../entities/empire';
import { Land } from '../entities/land';
import { Region } from '../entities/region';

export class EntityManager {
  // TODO: check data structure, map?, dictionary?
  private _regions: Region[] = [];
  private _lands: Land[] = [];
  private _empires: Empire[] = [];

  add<T extends Entities>(entity: T) {
    switch (entity.type) {
      case 'LAND':
        this._lands.push(entity);
        break;
      case 'REGION':
        this._regions.push(entity);
        break;
      case 'EMPIRE':
        this._empires.push(entity);
        break;
      default:
    }
  }

  // TODO: fix this hack

  getAll<T extends Entities>(entityType: T['type']): T[] {
    switch (entityType) {
      case 'LAND':
        return this._lands.slice() as T[];
      case 'REGION':
        return this._regions.slice() as T[];
      case 'EMPIRE':
        return this._empires.slice() as T[];
      default:
        return [];
    }
  }
}
