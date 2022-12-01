import { Blackboard } from '../ai/blackboard';
import { GameBlackboard } from './blackboard';

// name: World state? Global blackboard
export class GlobalGameBlackboard extends GameBlackboard {
  private static _instance: GlobalGameBlackboard;
  private blackboard = new GameBlackboard();

  static get instance() {
    if (!this._instance) {
      this._instance = new GlobalGameBlackboard();
    }
    return this._instance.blackboard;
  }
}
