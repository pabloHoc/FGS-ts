import { Entities, EntityId } from '../entities';
import { Agent } from '../entities/agent';
import { Empire } from '../entities/empire';
import { Land } from '../entities/land';
import { Region } from '../entities/region';

// ? Change to context?
export class GameContext {
  private _regions: Map<EntityId, Region> = new Map();
  private _lands: Map<EntityId, Land> = new Map();
  private _empires: Map<EntityId, Empire> = new Map();
  private _agents: Map<EntityId, Agent> = new Map();
  private _turn = 0;

  addEntity<T extends Entities>(entity: T) {
    switch (entity.type) {
      case 'EMPIRE':
        this._empires.set(entity.id, entity);
        break;
      case 'REGION':
        this._regions.set(entity.id, entity);
        break;
      case 'LAND':
        this._lands.set(entity.id, entity);
        break;
      case 'AGENT':
        this._agents.set(entity.id, entity);
        break;
      default:
    }
  }

  getEntity<T extends Entities>(entityType: T['type'], entityId: EntityId): T {
    switch (entityType) {
      case 'EMPIRE':
        return this._empires.get(entityId) as T;
      case 'REGION':
        return this._regions.get(entityId) as T;
      case 'LAND':
        return this._lands.get(entityId) as T;
      case 'AGENT':
        return this._agents.get(entityId) as T;
      default:
        throw Error('Entity not found');
    }
  }

  // TODO: fix this hack

  getAllEntities<T extends Entities>(entityType: T['type']): T[] {
    switch (entityType) {
      case 'EMPIRE':
        return Array.from(this._empires.values()) as T[];
      case 'REGION':
        return Array.from(this._regions.values()) as T[];
      case 'LAND':
        return Array.from(this._lands.values()) as T[];
      case 'AGENT':
        return Array.from(this._agents.values()) as T[];
      default:
        return [];
    }
  }

  // Turn Manager?

  get turn() {
    return this._turn;
  }

  increaseTurn() {
    this._turn++;
  }
}
