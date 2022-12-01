import { CompoundTask } from '../ai/compound-task';
import { Domain } from '../ai/domain';
import { GameBlackboard } from '../core/blackboard';
import { Empire } from '../entities/empire';
import { CreateArmy } from '../tasks/create-army';

const winGame = new CompoundTask('WIN_GAME', ['CREATE_ARMY']);

export const empireDomain = new Domain<GameBlackboard, Empire>(winGame);

empireDomain.addTask(new CreateArmy());
