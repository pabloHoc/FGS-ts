import { Command } from '..';
import { DefinitionManager } from '../../core/definition-manager';
import { NarrowAction } from '../../core/dispatcher';
import { GameContext } from '../../core/game-context';
import { EndTurn } from '../end-turn';
import { moveAgents } from '../move-agents';
import { produceResources } from '../produce-resources';
import { startTurn } from '../start-turn';

export const endTurn = (
  command: EndTurn,
  gameContext: GameContext,
  definitionManager: DefinitionManager,
  executeCommand: (command: NarrowAction<Command, Command['action']>) => void
) => {
  executeCommand(moveAgents());
  executeCommand(produceResources());
  executeCommand(startTurn());
};
