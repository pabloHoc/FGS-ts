import { Entities, Entity, EntityId } from '../entities';
import { Agent } from '../entities/agent';
import { BuildingQueueItem } from '../entities/building-queue-item';
import { Empire } from '../entities/empire';
import { Land } from '../entities/land';
import { Region } from '../entities/region';
import { TypeMapper } from '../helpers/types';

export class GameContext {
  private _turn = 0;

  // We could use typescript template strings to change property names
  private _context = {
    region: new Map<EntityId, Region>(),
    land: new Map<EntityId, Land>(),
    empire: new Map<EntityId, Empire>(),
    agent: new Map<EntityId, Agent>(),
    building_queue_item: new Map<EntityId, BuildingQueueItem>(),
  };

  private getEntitiesByType<
    K extends keyof TypeMapper<GameContext['_context']>
  >(type: Uppercase<K>) {
    return this._context[type.toLowerCase() as K];
  }

  // TODO: can we remove never?

  addEntity<T extends Entity>(entity: T) {
    this.getEntitiesByType(entity.type).set(entity.id, entity as never);
  }

  getEntity<T extends Entities>(entityType: T['type'], entityId: EntityId): T {
    return this.getEntitiesByType(entityType).get(entityId) as T;
  }

  getAllEntities<T extends Entity>(entityType: T['type']): T[] {
    return Array.from(this.getEntitiesByType(entityType).values() as never);
  }

  deleteEntity<T extends Entities>(entity: T) {
    this.getEntitiesByType(entity.type).delete(entity.id);
  }

  // Turn Manager?

  get turn() {
    return this._turn;
  }

  increaseTurn() {
    this._turn++;
  }
}
