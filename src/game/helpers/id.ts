import { v4 as uuidv4 } from 'uuid';
import { EntityId } from '../entities';

export const generateId = (): EntityId => uuidv4() as EntityId;
