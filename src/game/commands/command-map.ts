import { Entity } from '../entities';
import { setLocationWithScope } from './set-location';
import { setOwnerWithScope } from './set-owner';

export const COMMANDS = {
  set_owner: setOwnerWithScope,
  set_location: setLocationWithScope,
};

export type Action = keyof typeof COMMANDS;

export const getCommand = (action: Action) => (scope: Entity, values: any) =>
  COMMANDS[action](scope, values);
