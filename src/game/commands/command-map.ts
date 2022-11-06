import { Entity } from '../entities';
import { setOwnerWithScope } from './set-owner';

export const COMMANDS = {
  set_owner: setOwnerWithScope,
};

export type Action = keyof typeof COMMANDS;

export const getCommand = (action: Action) => (scope: Entity, values: any) =>
  COMMANDS[action](scope, values);
