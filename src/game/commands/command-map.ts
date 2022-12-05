import { Entity } from '../entities';
import { setLocationWithScope } from './set-location';
import { setOwnerWithScope } from './set-owner';

export const COMMANDS = {
  set_owner: setOwnerWithScope,
  set_location: setLocationWithScope,
};

export type ActionKey = keyof typeof COMMANDS;

export const getCommand = (action: ActionKey) => (scope: Entity, values: any) =>
  COMMANDS[action](scope as any, values);
