export interface Blackboard {
  getInputValue<T>(target: T, name: string): number;
}
