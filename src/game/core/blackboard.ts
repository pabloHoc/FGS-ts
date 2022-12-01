import { Blackboard } from '../ai/blackboard';
import { EntityType, EntityId, Entities, Entity } from '../entities';
import { ActionQueueItem } from '../entities/action-queue-item';
import { Agent } from '../entities/agent';
import { Army } from '../entities/army';
import { BuildingQueueItem } from '../entities/building-queue-item';
import { Empire } from '../entities/empire';
import { Land } from '../entities/land';
import { Modifier } from '../entities/modifier';
import { Region } from '../entities/region';
import { Spell } from '../entities/spell';
import { TypeMapper } from '../helpers/types';

// TODO: add method to subscribe to add and deletes
export class GameBlackboard implements Blackboard {
  private _turn = 0;

  // TODO: We could use typescript template strings to change property names
  private _context: {
    [k in Lowercase<EntityType>]: Map<
      EntityId,
      Extract<Entities, { type: Uppercase<k> }>
    >;
  } = {
    region: new Map<EntityId, Region>(),
    land: new Map<EntityId, Land>(),
    empire: new Map<EntityId, Empire>(),
    agent: new Map<EntityId, Agent>(),
    building_queue_item: new Map<EntityId, BuildingQueueItem>(),
    action_queue_item: new Map<EntityId, ActionQueueItem>(),
    modifier: new Map<EntityId, Modifier>(),
    spell: new Map<EntityId, Spell>(),
    army: new Map<EntityId, Army>(),
  };

  // TODO: if this is a blackboard, maybe we should remove this
  private _variables = new Map<string, string>();

  private getEntitiesByType<
    K extends keyof TypeMapper<GameBlackboard['_context']>
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

  setVariable(variable: string, value: string) {
    this._variables.set(variable, value);
  }

  getVariable(variable: string) {
    return this._variables.get(variable);
  }

  // TODO: Turn Manager?
  get turn() {
    return this._turn;
  }

  increaseTurn() {
    this._turn++;
  }
}