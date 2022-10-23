import { Entities, Entity, EntityId } from '../entities';
import { Agent } from '../entities/agent';
import { BuildingQueueItem } from '../entities/building-queue-item';
import { Empire } from '../entities/empire';
import { Land } from '../entities/land';
import { Region } from '../entities/region';

// ? Change to context?
export class GameContext {
  private _regions: Map<EntityId, Region> = new Map();
  private _lands: Map<EntityId, Land> = new Map();
  private _empires: Map<EntityId, Empire> = new Map();
  private _agents: Map<EntityId, Agent> = new Map();
  private _buildingQueueItems: Map<EntityId, BuildingQueueItem> = new Map();
  private _turn = 0;

  private getEntitiesByType<T extends Entities>(
    entity: T | T['type']
  ): Map<EntityId, T> {
    const entityType = typeof entity === 'string' ? entity : entity.type;

    switch (entityType) {
      case 'EMPIRE':
        return this._empires as Map<EntityId, T>;
      case 'REGION':
        return this._regions as Map<EntityId, T>;
      case 'LAND':
        return this._lands as Map<EntityId, T>;
      case 'AGENT':
        return this._agents as Map<EntityId, T>;
      case 'BUILDING_QUEUE_ITEM':
        return this._buildingQueueItems as Map<EntityId, T>;
      default:
        throw Error('INVALID ENTITY TYPE');
    }
  }

  addEntity<T extends Entities>(entity: T) {
    this.getEntitiesByType<T>(entity).set(entity.id, entity);
  }

  getEntity<T extends Entities>(entityType: T['type'], entityId: EntityId): T {
    return this.getEntitiesByType<T>(entityType).get(entityId) as T;
  }

  // TODO: fix this hack

  getAllEntities<T extends Entities>(entityType: T['type']): T[] {
    return Array.from(this.getEntitiesByType<T>(entityType).values()) as T[];
  }

  deleteEntity<T extends Entities>(entity: T) {
    this.getEntitiesByType<T>(entity).delete(entity.id);
  }

  // Turn Manager?

  get turn() {
    return this._turn;
  }

  increaseTurn() {
    this._turn++;
  }
}
