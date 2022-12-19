import { Blackboard } from '../utility-ai/blackboard';
import { EntityType, Entities, Entity } from '../entities';
import {
  ActionQueueItem,
  ActionQueueItemId,
} from '../entities/action-queue-item';
import { Agent, AgentId } from '../entities/agent';
import { Army, ArmyId } from '../entities/army';
import {
  BuildingQueueItem,
  BuildingQueueItemId,
} from '../entities/building-queue-item';
import { Empire, EmpireId } from '../entities/empire';
import { Land, LandId } from '../entities/land';
import { Modifier, ModifierId } from '../entities/modifier';
import { Region, RegionId } from '../entities/region';
import { Spell, SpellId } from '../entities/spell';
import { TypeMapper } from '../helpers/types';
import { getInputValue } from '../ai/inputs';
import { Player, PlayerId } from '../entities/player';

// TODO: add method to subscribe to add and deletes
export class GameBlackboard implements Blackboard {
  private _turn = 0;

  // TODO: We could use typescript template strings to change property names
  private _context: {
    [k in Lowercase<EntityType>]: Map<
      Extract<Entities, { type: Uppercase<k> }>['id'],
      Extract<Entities, { type: Uppercase<k> }>
    >;
  } = {
    player: new Map<PlayerId, Player>(),
    empire: new Map<EmpireId, Empire>(),
    region: new Map<RegionId, Region>(),
    land: new Map<LandId, Land>(),
    agent: new Map<AgentId, Agent>(),
    building_queue_item: new Map<BuildingQueueItemId, BuildingQueueItem>(),
    action_queue_item: new Map<ActionQueueItemId, ActionQueueItem>(),
    modifier: new Map<ModifierId, Modifier>(),
    spell: new Map<SpellId, Spell>(),
    army: new Map<ArmyId, Army>(),
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
    this.getEntitiesByType<Lowercase<T['type']>>(
      entity.type as Uppercase<Lowercase<T['type']>>
    ).set(entity.id as never, entity as never);
  }

  getEntity<T extends Entities>(entityType: T['type'], entityId: T['id']): T {
    return this.getEntitiesByType(entityType).get(entityId as never) as T;
  }

  getAllEntities<T extends Entity>(entityType: T['type']): T[] {
    return Array.from(this.getEntitiesByType(entityType).values() as never);
  }

  deleteEntity<T extends Entities>(entity: T) {
    this.getEntitiesByType(entity.type).delete(entity.id as never);
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

  getInputValue<T>(target: T, name: string) {
    return getInputValue(this, target as Entity, name); // TODO: fix this cast
  }
}
