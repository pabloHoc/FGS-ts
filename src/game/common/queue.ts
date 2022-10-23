export class Queue<T> {
  public values: T[];
  private maxSize: number;

  constructor(maxSize?: number) {
    this.values = new Array<T>();
    this.maxSize = maxSize || Infinity;
  }

  enqueue(item: T): void {
    if (!item) return;
    else {
      if (this.values.length >= this.maxSize)
        throw new Error(`Queue is full. Max: ${this.maxSize}`);
      else this.values.push(item);
    }
  }

  dequeue(): T {
    if (!this.values.length) throw new Error(`Queue is empty.`);
    else {
      return this.values.splice(0, 1)[0];
    }
  }

  peek(): T {
    return this.values[0];
  }

  length(): number {
    return this.values.length;
  }

  isEmpty(): boolean {
    if (!this.values.length) return true;
    else return false;
  }

  isFull(): boolean {
    if (this.values.length == this.maxSize) return true;
    else return false;
  }
}
